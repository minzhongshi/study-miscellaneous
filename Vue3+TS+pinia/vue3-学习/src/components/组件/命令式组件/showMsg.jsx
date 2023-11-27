import { createApp } from 'vue';
import { styled } from '@styils/vue';
import { ElButton } from 'element-plus';

const DivModel = styled('div',{
    position:'fixed',
    width:'100%',
    height:'100%',
    top:'0',
    left:'0',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#00000050',
    zIndex:'9999',
})
const DivBox = styled('div',{
    width:'300px',
    height:'200px',
    backgroundColor:'#fff',
    borderRadius:'10px',
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
})
const DivText = styled('div',{
    fontSize:'1em',
    color:'#000',
    marginBottom:'20px',
})


const MessageBox = {
    props:{
        msg:{
            type:String,
            required:true
        },
    },
    render(ctx){
        const {$props, $emit} = ctx;
        return (
            <DivModel>
                <DivBox>
                    <DivText>{$props.msg}</DivText>
                    <ElButton type={"primary"}  click={$emit("onClick")}>确定</ElButton >
                </DivBox>
            </DivModel>
        )
    }
}
export default function showMsg(msg, clickHandler) {
    const app = createApp(MessageBox,{
       msg,
        onClick(){
           clickHandler && clickHandler(()=>{
                app.unmount();
                div.remove();
           })
        }

    });
    const div = document.createElement('div');
    document.body.appendChild(div);
    app.mount(div);
}