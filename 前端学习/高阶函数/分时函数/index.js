const btn = document.querySelector('.btn')
const datas = Array.from({length: 100000}, (_,i) =>i )
btn.onclick=()=>{
    const taskHandler = ()=>{
        const div = document.createElement('div')
        div.textContent = datas[i]
        document.body.appendChild(div)
    }
    performChunk(datas,taskHandler)
}

function performChunk(datas,taskHandler) {
    if (typeof datas === 'number'){
        datas = {length: datas}
    }
    if (!datas.length) return
    let i= 0
    function _run(){
        if(i>=datas.length) return
        requestIdleCallback((idle)=>{
            while(idle.timeRemaining()>0 && i<datas.length){
              taskHandler(datas[i],i)
                i++
            }
            _run()
        })
    }
    _run()
}