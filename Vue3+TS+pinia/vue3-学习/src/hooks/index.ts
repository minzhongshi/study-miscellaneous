import {onMounted} from "vue";

/**
 * 用于生成图片base64
 */
type Options = {
    el:string
}
export default function (options:Options):Promise<{baseUrl:string}> {
    // @ts-ignore
    return new Promise((resolve)=>{
        onMounted(()=>{
            let img:HTMLImageElement = document.querySelector(options.el) as HTMLImageElement
            img.onload = () =>{
                resolve({
                    baseUrl:base64(img)
                })
            }
        })
        const base64 = (el:HTMLImageElement) =>{
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            canvas.width = el.width
            canvas.height = el.height
            ctx?.drawImage(el,0,0,canvas.width,canvas.height)
            return canvas.toDataURL('image/jpg')
        }
    })
}