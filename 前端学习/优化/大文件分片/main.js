import {cutFile} from "./cutFile.js";

const inpFile = document.querySelector('input[type="File"]')

inpFile.onchange = async (e)=>{
    const file = e.target.files[0]
    const chunks = await cutFile(file)
    console.log(chunks)
}