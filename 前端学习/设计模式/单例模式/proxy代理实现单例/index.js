import singleton from "./利用代理实现单例.js";

/**
 * constructor:构造函数
 */
class MyStorage {
    constructor(a,b) {
        this.a = a
        this.b = b
    }
}
export default singleton(MyStorage)
