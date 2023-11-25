interface ShowMessage{
    (options:object):void;
    (text:string,onClose?:Function):void;
    (text:string,mode:string,duration?:number):void;
    (text:string,duration?:number,onClose?:Function):void;
}
interface Utils {
    showMessage:ShowMessage;
}
const utils: Utils = {
    showMessage(
        param1:string | object,
        param2?:string | number | Function,
        param3?:number | Function,
    ){}
}

utils.showMessage({
    text:'lisi',
    mode:'mode',
    onClose:()=>{},
    duration:1000
});
utils.showMessage('text')