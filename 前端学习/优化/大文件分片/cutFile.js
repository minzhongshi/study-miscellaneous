const CHUNK_SIZE = 1024 * 1024 * 5 //分片大小 5MB
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 获取机器CPU数量线程
export async function cutFile(file) {
    return new Promise((resolve)=>{
        const result = []
        let finishCount = 0 // 线程完成数量
        const chunkCount = Math.ceil(file.size /CHUNK_SIZE)// 计算多少个分片
        const workerChunkCount = Math.ceil(chunkCount /THREAD_COUNT)// 每个线程多少个分片
        for (let i = 0;i<THREAD_COUNT;i++){
            // 创建新的Worker线程
            const worker = new Worker('./worker.js',{
                type:"module"
            })
            // 计算每个线程开始索引和结束索引
            const startIndex = i * workerChunkCount
            let endIndex = startIndex + workerChunkCount
            if (endIndex > chunkCount){// 当大于分片数量时
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