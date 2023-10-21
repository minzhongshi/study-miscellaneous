'use strict';

//版本
var TrackerConfig;
(function (TrackerConfig) {
    TrackerConfig["version"] = "1.0.0";
})(TrackerConfig || (TrackerConfig = {}));

/**
 * hash:可以通过hashchange事件来监听hash变化，然后上报
 * history:可以通过popstate事件来监听history变化（前进后退历史记录），无法监听页面跳转pushState、replaceState
 *         需要重写pushState、replaceState方法，然后上报
 * @description: pv统计
 */
const createHistoryEvent = (type) => {
    const origin = history[type]; // 保存原始方法
    return function () {
        const res = origin.apply(this, arguments); // 重写history的pushState、replaceState方法
        const e = new Event(type); // 创建自定义事件
        window.dispatchEvent(e); // 触发自定义事件
        return res;
    };
};

// dom事件
const MouseEventList = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'];
class Tracker {
    constructor(options) {
        this.data = Object.assign(this.initDef(), options); // 合并默认参数
        this.installInnerTrack(); // 安装内置上报
    }
    // 兜底，默认值
    initDef() {
        this.version = TrackerConfig.version;
        window.history.pushState = createHistoryEvent('pushState'); // 重写pushState方法
        window.history.replaceState = createHistoryEvent('replaceState'); // 重写replaceState方法
        return {
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            sdkVersion: TrackerConfig.version,
            jsError: false
        };
    }
    // 对外暴露方法
    // 设置用户id，用户唯一标识，还可以使用canvas指纹技术
    setUserId(uuid) {
        this.data.uuid = uuid;
    }
    // 自定义透传字段
    setExtra(extra) {
        this.data.extra = extra;
    }
    // 手动上报
    sendTracker(data) {
        this.reportTracker(data);
    }
    // 自动上报
    captureEvents(mouseEventList, targetKey, data) {
        mouseEventList.forEach((eventType) => {
            window.addEventListener(eventType, () => {
                this.reportTracker({
                    event: eventType,
                    targetKey: targetKey,
                    data: data
                });
            });
        });
    }
    // 判断类型
    installInnerTrack() {
        if (this.data.historyTracker) {
            // history上报
            this.captureEvents(['pushState', 'replaceState', 'popstate'], 'history-pv'); // 监听history变化
        }
        if (this.data.hashTracker) {
            // hash上报
            this.captureEvents(['hashchange'], 'hash-pv'); // 监听hash变化
        }
        if (this.data.domTracker) {
            this.targetKeyReport();
        }
        if (this.data.jsError) {
            this.jsError();
        }
    }
    //dom 事件上报
    targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target; // 获取dom 并断言成HTMLElement类型，因为HTMLElement类型上有getAttribute方法，Element类型上没有
                const targetValue = target.getAttribute('target-key'); // 获取自定义属性
                if (targetValue) {
                    this.sendTracker({
                        targetKey: targetValue,
                        event
                    });
                }
            });
        });
    }
    //js和promise错误收集
    jsError() {
        this.errorEvent();
        this.promiseReject();
    }
    //捕获js报错 ===> error事件 读取error对象的message属性 上报日志
    errorEvent() {
        window.addEventListener('error', (event) => {
            this.sendTracker({
                targetKey: 'message',
                event: 'error',
                message: event.message
            });
        });
    }
    //捕获promise 错误 reject ===> unhandledrejection事件 返回一个promise对象 利用catch方法捕获错误
    promiseReject() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.sendTracker({
                    targetKey: "reject",
                    event: "promise",
                    message: error
                });
            });
        });
    }
    //上报方法 通过navigator.sendBeacon
    reportTracker(data) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() }); // 数据和时间
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob);
    }
}

module.exports = Tracker;
