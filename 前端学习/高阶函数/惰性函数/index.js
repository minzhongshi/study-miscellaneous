/**
 * 利用惰性函数实现复制文本到剪贴板
 * 只在第一次调用执行
 * 惰性函数, 改变函数的执行方式, 使其在第一次执行后, 以另一种方式执行
 * 副作用: 会改变函数本身
 * @param text 要复制的文本
 */
function copyText(text) {
    if (!navigator.clipboard) {
        copyText = (text) =>{
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 9999);
            document.execCommand('copy');
            document.body.removeChild(input);
        }
    }else{
        copyText = (text) => {
            navigator.clipboard.writeText(text).then(function() {
                console.log('复制成功到剪贴板');
            }, function(err) {
                console.error('无法复制文本: ', err);
            });
        }
    }
    copyText(text)
}

/**
 * 高阶函数实现复制文本到剪贴板,消除副作用
 * 需要开始执行确定，会占用首屏时间
 * @param text 要复制的文本
 */
const copyText2 = (function createCopyText(text) {
    if (!navigator.clipboard) {
        return  (text) =>{
            const input = document.createElement('input');
            input.setAttribute('readonly', 'readonly');
            input.setAttribute('value', text);
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 9999);
            document.execCommand('copy');
            document.body.removeChild(input);
        }
    }else{
       return  (text) => {
            navigator.clipboard.writeText(text).then(function() {
                console.log('复制成功到剪贴板');
            }, function(err) {
                console.error('无法复制文本: ', err);
            });
        }
    }
})()
