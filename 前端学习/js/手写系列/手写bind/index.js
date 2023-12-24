Function.prototype.myBind = function (ctx,...args) {
    const fn = this; // this指向调用bind的函数
    return function (...subArgs) {
        if (new.target) { // new调用返回原函数实例
            return new fn(...args,...subArgs)
        }else { // 普通调用返回原函数执行结果
            return  fn.call(ctx,...args,...subArgs)
        }
    }
}

// test
function foo(a, b, c, d) {
    console.log('args',a, b, c, d);
    console.log('this',this);
}
const newFoo = foo.myBind({name: 'ctx'}, 1, 2);

newFoo(3, 4); // args 1 2 3 4 this { name: 'ctx' }
new newFoo(3, 4); // args 1 2 3 4 this foo {}