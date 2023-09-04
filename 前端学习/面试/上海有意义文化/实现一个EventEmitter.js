/**
 * 实现一个 EventEmitter
 * 这里查了一下EventEmitter属于node服务端events模块对外提供的一个EventEmitter对象，用于对Node.js中
 * 对事件进行统一管理，表示没学Node,根本不知道啊，只知道浏览器事件EventTarget，不过二者都差不多，都是用来对事件进行处理的
 * 不过浏览器事件会存在冒泡，因为在Node中不存在层级关系，浏览器DOM是存在层级关系的，
 * 且浏览器事件是基于观察者模式的，而EventEmitter的事件是基于发布订阅模式的。
 *    分析：需要编写一个类，实现内部方法on、once、emit、removeListener
 *         1、on:注册事件监听器，接受两个参数，第一个参数是事件名称，第二个参数是事件监听器。
 *              先判断是否存在该事件，不存在旧创建空数组并将事件处理函数添加到数组中
 *         2、once:注册事件监听器，只会触发一次，触发后会自动移除。
 *                 本质还是调用on方法，只不过事件处理函数会被额外包裹一层，其中事件处理函数最后会调用off方法，
 *                 off方法，会根据传入事件处理函数名称来去除不是 callback 的函数，这样旧形成了只调用一次
 *         3、emit:按照注册的顺序同步调用为名为传入名称的事件注册的每个侦听器
 *                 循环遍历事件集合，执行事件处理函数
 *         4、removeListener:移除事件监听器，接受两个参数，第一个参数是事件名称，第二个参数是事件监听器。
 *                           直接移除事件对象对应的属性
 *
 * */

class EventEmitter {
    constructor() {
        this.events = {}// 存储事件
    }
    // 在这里实现
    on(event,callback) {// 监听
        if (!this.events[event]){// 是否存在该事件
            this.events[event] = []// 不存在创建一个空数组
        }
        this.events[event].push(callback)// 将事件处理函数添加到数组集合中
    }
    once(event,callback){// 单次监听
        const wrapper = () => {// 在外包裹一层，使调用时同时清除该次事件处理函数
            callback();
            this.off(event);
        };
        this.on(event, wrapper);
    }
    off(event){
        if (!this.events[event]) {
            return;
        }
        this.events[event] = this.events[event].filter((cb) => cb!== callback);
    }
    emit(event){// 触发事件
        if (!this.events[event]) {
            return;
        }
        this.events[event].forEach((callback) => callback());// 循环执行事件
    }
    removeListener(event){
        if (!this.events[event]) {
            return;
        }
        delete this.events[event]// 删除事件
    }
}

const eventEmitter = new EventEmitter()

function callback() {
    console.log('hit!')
}

// 监听事件, 其中有一个 once 单次监听
eventEmitter.on('custom-event', callback)
eventEmitter.once('custom-event', callback)

// 连续触发两次
eventEmitter.emit('custom-event')
eventEmitter.emit('custom-event')
// 预期输出 3 次 "hit!"

// 删除并再次=触发
eventEmitter.removeListener('custom-event');
eventEmitter.emit('custom-event')
// 预期没有输出