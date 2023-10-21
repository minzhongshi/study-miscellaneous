/**
 * cutFile 计算、创建线程函数
 * @param file 文件
 * @returns {Promise<unknown>}
 * @constructor
 * @description
 *
 * 1. 计算分片数量
 * 2. 计算每个线程分片数量
 * 3. 创建线程
 * 4. 传输消息
 * 5. 消息回传
 * 6. 清除线程
 * 7. 保证回传分片顺序正确
 * 8. 结束
 */

const CHUNK_SIZE = 1024 * 1024 * 5 //分片大小 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 获取机器CPU数量线程
export async function cutFile(file) {
    return new Promise((resolve)=>{
        const result = [] // 结果
        let finishCount = 0 // 线程完成数量
        const chunkCount = Math.ceil(file.size /CHUNK_SIZE)// 计算多少个分片
        const workerChunkCount = Math.ceil(chunkCount /THREAD_COUNT)// 每个线程多少个分片
        for (let i = 0;i<THREAD_COUNT;i++){
            // 创建新的Worker线程
            const worker = new Worker('./worker.js',{
                type:"module"
            })
            // 计算每个线程开始索引和结束索引，用来使回传分片顺序正确
            const startIndex = i * workerChunkCount // 开始索引
            let endIndex = startIndex + workerChunkCount// 结束索引
            if (endIndex > chunkCount){// 当大于分片数量时，最后一个线程的结束索引可能大于总分片数量
                endIndex = chunkCount
            }
            worker.postMessage({// 传输消息
                file,
                CHUNK_SIZE,
                startIndex,
                endIndex
            })
            worker.onmessage = (e) =>{//消息回传
                for (let i = startIndex;i<endIndex;i++){// 保证回传分片顺序正确
                    result[i] = e.data[i-startIndex]
                }
                worker.terminate() // 清除线程
                finishCount++
                if (finishCount === THREAD_COUNT){
                    resolve(result)
                }
            }
        }
    })
}