// 可用于记录错误的因果链
// 可以传递我们错误信息，易于理解深度嵌套的错误
function capture() {
    try {
        fun();
    } catch (err) {
        throw new Error('error message', { cause: err });
    }
}

// 调用
try {
    capture();
} catch (err) {
    console.log(err);
    console.log(`Cause by: ${err.cause}`);
}

