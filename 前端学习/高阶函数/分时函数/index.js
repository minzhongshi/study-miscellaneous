const btn = document.querySelector('.btn')
const datas = Array.from({length: 100000}, (_,i) =>i ) // 生成一个长度为100000的数组
btn.onclick=()=>{
    const taskHandler = (item,i)=>{
        const div = document.createElement('div')
        div.textContent = i
        document.body.appendChild(div)
    }
    // 分批函数
    const chunkSplitor = (task)=>{
        setTimeout(()=>{
            task((time)=>time < 16)
        },50)
    }
    performChunk(datas,taskHandler,chunkSplitor)
}

/**
 * requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。
 *   requestIdleCallback的第一个参数时callback
 *   当callback被调用时，回接受一个参数 deadline，deadline是一个对象，对象上有两个属性
 *     timeRemaining，timeRemaining属性是一个函数，函数的返回值表示当前空闲时间还剩下多少时间
 *     didTimeout，didTimeout属性是一个布尔值，如果didTimeout是true，那么表示本次callback的执行是因为超时的原因
 *
 *   requestIdleCallback的第二个参数是options
 *     options是一个对象，可以用来配置超时时间
 *
 */

/**
 * 分时函数,将任务分批执行，支持多环境，多方式
 * @param datas 数据，可以是数组，也可以是数字，如果是数字，那么会生成一个长度为该数字的数组
 * @param taskHandler 任务处理函数
 * @param chunkSplitor 分批函数，如果不传，那么会使用requestIdleCallback
 * @returns {function(...[*]=)} 返回一个函数
 *
 */


function performChunk(datas,taskHandler,chunkSplitor) {
    if (typeof datas === 'number'){
        datas = new Array(datas)
    }
    if (!datas.length) return
    if (!chunkSplitor && globalThis.requestIdleCallback()){// 如果支持requestIdleCallback,以及没有传分批函数,那么就使用requestIdleCallback
        chunkSplitor = (task)=>{
            requestIdleCallback(idle=>{
                task((idle.timeRemaining()>0))
            })
        }
    }
    let i= 0
    function _run(){
        if(i>=datas.length) return
        chunkSplitor((hasTime)=>{ // 空闲时执行
            const now = Date.now()
            while(hasTime(Date.now() -now) && i<datas.length){ // 当前空闲时间大于0,并且还有任务未执行
                taskHandler(datas[i],i)// 执行任务
                i++
            }
            _run()
        })
    }
    _run()
}