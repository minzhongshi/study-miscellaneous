/**
 *  设计一个 Cache
 *  支持下列两个基本操作：
 *    - set(id, object), 根据id设置对象;
 *    - get(id): 根据id得到一个对象;
 *  同时它有下面几个性质:
 *    1. x秒自动过期, 如果cache内的对象, x秒内没有被get或者set过, 则会自动过期;
 *    2. 对象数限制, 该cache可以设置一个n, 表示cache最多能存储的对象数;
 *    3. LRU置换, 当进行set操作时, 如果此时cache内对象数已经到达了n个, 则cache自动将最久未被使用过的那个对象剔除, 腾出空间放置新对象;
 *
 *   分析：
 *       在设置缓存对象时，我们首先将其封装成一个对象 { obj, timestamp }，其中 timestamp 表示缓存对象的时间戳，用于判断对象是否过期。
 *       然后，我们将该对象存储在缓存中，当缓存中不存在该缓存时将其唯一标识添加到 LRU 链表的末尾。
 *       检查缓存的大小，如果超过了最大大小，则自动删除最早添加的缓存对象；如果存在，则更新 LRU 链表位置，以及缓存时间戳信息。
 *       get 方法用于获取缓存对象，它接受一个参数 id，表示要获取的缓存对象的唯一标识。
 *       在获取缓存对象时，我们首先检查该对象是否存在，如果不存在，则返回 不存在。
 *       如果存在，则检查该对象是否过期，如果过期，则从缓存中删除该对象，并返回 '已过期'。
 *       否则，我们将该对象移动到 LRU 链表的首部，并返回缓存对象。
 *       delete 方法用于删除缓存对象，它接受一个参数 id，表示要删除的缓存对象的唯一标识。
 *       在删除缓存对象时，我们首先从缓存中删除该对象，并从 LRU 链表中删除该对象的唯一标识。
 *
 */

class Cache {
    constructor(maxSize = 10,maxAge = 60) {
        this.maxSize = maxSize // 最大缓存数
        this.maxAge = maxAge// 最长过期时间
        this.cache = {}// 缓存列表
        this.lruList = [] // 缓存唯一标识
    }
    set(id,obj){
        const item = this.cache[id];// 在缓存中查找是否存在
        const timestamp = Date.now() // 存储建立的时间
        this.cache[id] = {obj, timestamp} // 封装成对象存储在缓存中
        if (!item){// 不存在
            this.lruList.push(id)// 将唯一标识添加到链表末尾
            this._checkSize()// 检查缓存大小
        }else {// 存在
            this._moveToFront(id);//将该id标识移动到最后面
        }
    }
    get(id){
        const item = this.cache[id];// 在缓存中查找是否存在
        if (!item) {// 不存在返回提示
            return '不存在';
        }
        if (Date.now() - item.timestamp > this.maxAge * 1000) {// 判断是否过期,过期删除并返回提示
            this.delete(id);
            return '已过期';
        }
        this._moveToFront(id);//将该id标识移动到最后面
        return item.obj;
    }
    delete(id){// 过期删除缓存及标识
        delete this.cache[id];// 删除缓存
        this.lruList = this.lruList.filter((item) => item!== id);// 移除标识
    }
    _checkSize() {// 缓存满删除缓存
        if (this.lruList.length > this.maxSize) {// 大于了最大储存数时
            const id = this.lruList.shift();// 返回第一个元素
            delete this.cache[id];// 在缓存中删除
        }
    }

    _moveToFront(id) {// 更新id标识位置
        const index = this.lruList.indexOf(id);// 指定元素下标
        if (index!== -1) {// 存在
            this.lruList.splice(index, 1);//移除id标识旧位置
            this.lruList.push(id);// 将id标识添加到链表最后面
        }
    }

    getList(){// 返回存储集合
        return this.cache
    }
}

// 测试
const cache = new Cache(2,3)
cache.set(1,{name:'smz1'})
cache.set(2,{name:'smz2'})
cache.set(1,{name:'smz3'})
setTimeout(()=>{
    console.log(cache.get(1))// 已过期
},4000)
console.log(cache.getList())


