/**
 * 写个函数用来渲染这个结构
 * 就是将一个虚拟DOM渲染成真实DOM的过程
 *  分析:
 *     type：标签名
 *     props：属性名，是个集合可能包含许多属性，需要遍历挂载，需要处理行内样式和值的绑定
 *     childrens：子元素,子元素分为两种：一种为标签元素，另外一种为文本元素
 *     查看结构每个对象中都会包含childrens用来储存该DOM下的层级关系，通过递归的形式进行渲染
 */
const renderJSON = {
    type: 'div',
    props: {
        className: '',
    },
    childrens:[
        {
            type: 'p',
            props: {
                text:'xxxxx'
            },
            childrens:['xxxx']
        }
    ]
}
const render = (renderJSON) =>{
    const {type, props, childrens} = renderJSON //将三个参数结构出来
    let el = document.createElement(type)// 创建标签元素
    for (let key in props){// 挂载属性
        el.setAttribute(key,props[key])//设置属性上的值，这里没有考虑行内样式以及绑定值的处理
    }
    //创建子节点
    childrens.forEach(child =>{
        if (child instanceof Object){//如果为标签元素
            el.appendChild(render(child))//将子元素添加到父元素内部末尾处，递归创建子元素
        }else {//如果为文本
            let textNode = document.createTextNode(child)//创建一个文本节点，将文本塞入
            el.appendChild(textNode)//添加文本结点到父元素内部
        }
    })
    return el
}

document.body.appendChild(render(renderJSON))// 挂载到body下