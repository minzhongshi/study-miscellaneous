// 函数声明
function message(options:object):void;
function message(text:string,onClose?:Function):void;
function message(text:string,mode:string,duration?:number):void;
function message(text:string,duration?:number,onClose?:Function):void;
function message(
    // 函数参数
    param1:string | object,
    param2?:string | number | Function,
    param3?:number | Function,
):void {
    // 函数实现
}

//调用
message({
    text:'lisi',
    mode:'mode',
    onClose:()=>{},
    duration:1000
});

message('text')
message('text',1000)