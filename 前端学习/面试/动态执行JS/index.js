/**
 * 将字符串当作JS执行
 *   1.eval方式：同步---当前作用域
 *   2.setTimeout(code,0): 异步---全局作用域
 *   3.创建script标签：同步---全局作用域
 *     const script = document.createElement('script')
 *     script.innerHTML = code
 *     document.appendChild(script)
 *   4.构造Function：同步---全局作用域
 *     const fn = new Function(code)
 *     fn()
 */

let a = 1
function exec(code) {
    let a = 2

    eval(code)

    setTimeout(code,0)

    const script = document.createElement('script')
    script.innerHTML = code
    document.body.appendChild(script)

    const fn = new Function(code)
    fn()
}
exec('console.log("a",a)')