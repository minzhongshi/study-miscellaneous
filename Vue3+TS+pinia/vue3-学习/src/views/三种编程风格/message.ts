import {h, render} from "vue";

export const message = (message, duration = 2000) =>{
    const handleDestroy = () =>{
        render(null,document.body)
    }
    const vNode = h(
        'messageComponent',
        {
            style:{
                width: '200px',
                height: '100px',
                border: '2px solid',
                float: 'left',
                position: 'relative',
                left: '50%',
                'margin-left': '-50px'
            },
            message,
            duration,
            destroy:handleDestroy
        },message)
    render(vNode,document.body);
        (function () {
          setTimeout(()=>render(null,document.body),duration)
        })()
}