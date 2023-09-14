import SparkMD5 from './spark-md5.js'
export function createChunk(file, index, chunkSize) {
    return new Promise((resolve)=>{
        const start = index * chunkSize// 开始字节
        const end = start + chunkSize// 结束字节
        const spark = new SparkMD5.ArrayBuffer()// MD5
        const fileReader = new FileReader() // 文件读取器
        fileReader.onload = (e) =>{
            spark.append(e.target.result)// MD5编码
            resolve({
                start,
                end,
                index,
                hash:spark.end()
            })
        }
        // 转换成二进制数据
        fileReader.readAsArrayBuffer(file.slice(start,end))
    })
}