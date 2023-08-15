/**
 * 类单例的实现方法
 * @param className 需要变成单例的类
 * @returns {*} Reflect反射完成实例创建
 */
export default function singleton(className) {
    let ins;
    return new Proxy(className, {
        construct(target,  args) {
            if (!ins){
                ins = Reflect.construct(target,args)
            } else {
                throw new Error('已经存在实例对象')
            }
            return ins;
        }
    })
}