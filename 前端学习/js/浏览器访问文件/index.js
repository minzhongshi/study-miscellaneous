// File API
// 高亮显示代码 highlight.js
const btn = document.querySelector('button')
const div = document.querySelector('div')
// 返回是一个promise,异步操作。
btn.onclick = async function () {
    try {
        // 得到文件夹句柄
        // kind:"directory"  类型
        // name:"浏览器访问文件"  名称
        const handler = await showDirectoryPicker()
        const root =await processHandle(handler)
        const file = await root.children[1].getFile()//获取文件信息
        const reader = new FileReader()//读取文件
        reader.readAsText(file,'utf-8')//纯文本
        //触发事件onload，参数e为结果
        reader.onload = e =>{
            div.innerHTML = e.target.result
        }
    }catch {
        //拒绝访问文件夹内容
    }

}

/**
 *
 * @param handle 句柄
 * @returns {Promise<void>}
 */
async function processHandle(handle) {
    if (handle.kind === 'file') return handle //为文件直接返回

    handle.children = [] //添加属性，表示子句柄
    const iter = await handle.entries() // 获取文件夹中的所有内容
    //iter : 异步迭代器
    for await (const info of iter){
        const subHandle = await processHandle(info[1])//递归处理文件夹中的内容
        handle.children.push(subHandle)// 树状结构
    }
    return handle
}