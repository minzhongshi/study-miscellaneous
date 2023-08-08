/**
 * 实现Storage，使得该对象为单例，基于 localStorage 进行封装。实现方法 setItem(key,value) 和 getItem(key)。
 */
// 先实现一个基础的StorageBase类，把getItem和setItem方法放在它的原型链上
 StorageBase= () =>  {
    StorageBase.prototype.getItem = (key)=>{
        return localStorage.getItem(key)
    }
    StorageBase.prototype.setItem = (key, value) =>{
        return localStorage.setItem(key, value)
    }
}

const Storage =  (()=>{
    if (new.target){
        let instance = null
        return ()=>{
            if (!instance){
                instance = new StorageBase()
            }
            return instance
        }
    }
   throw new Error('请使用new关键字创建实例')
})()

const storage1 = new Storage()
const storage2 =new Storage()
storage1.setItem('name', '李雷')
// 李雷
storage1.getItem('name')
// 也是李雷
storage2.getItem('name')

