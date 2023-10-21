import {cutFile} from "./cutFile.js";

/**
 * main 主函数
 * 用来获取用户选择的文件
 * 并且调用cutFile函数进行文件分片
 * @type {Element}
 */
const inpFile = document.querySelector('input[type="File"]')

inpFile.onchange = async (e)=>{
    const file = e.target.files[0]
    const chunks = await cutFile(file)
    console.log(chunks)
}