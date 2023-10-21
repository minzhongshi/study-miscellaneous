import {DefaultOptions, Options, reportTrackerData, TrackerConfig} from "../type/index";
import {createHistoryEvent} from "../utils/pv";


// dom事件
const MouseEventList: string[] = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover']
export default class Tracker {
    public data:Options // 传入参数
    private version: string | undefined;// 版本
    constructor(options:Options) {
        this.data = Object.assign(this.initDef(),options)// 合并默认参数
        this.installInnerTrack()// 安装内置上报
    }
    // 兜底，默认值
    private initDef():DefaultOptions {
        this.version = TrackerConfig.version;
        window.history.pushState = createHistoryEvent('pushState') // 重写pushState方法
        window.history.replaceState = createHistoryEvent('replaceState') // 重写replaceState方法
        return <DefaultOptions>{
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            sdkVersion: TrackerConfig.version,
            jsError:false
        }
    }

    // 对外暴露方法
    // 设置用户id，用户唯一标识，还可以使用canvas指纹技术
    public setUserId<T extends DefaultOptions['uuid']>(uuid: T) {
        this.data.uuid = uuid;
    }

    // 自定义透传字段
    public setExtra<T extends DefaultOptions['extra']>(extra: T) {
        this.data.extra = extra
    }

    // 手动上报
    public sendTracker<T extends reportTrackerData>(data: T) {
        this.reportTracker(data)
    }

    // 自动上报
    private captureEvents<T>(mouseEventList:string[],targetKey:string,data?:T) {
        mouseEventList.forEach((eventType) => {
            window.addEventListener(eventType, () => {
                this.reportTracker({
                    event: eventType,
                    targetKey: targetKey,
                    data: data
                })
            })
        })
    }

    // 判断类型
    private installInnerTrack() {
        if (this.data.historyTracker) {
            // history上报
            this.captureEvents(['pushState', 'replaceState', 'popstate'], 'history-pv')// 监听history变化
        }
        if (this.data.hashTracker) {
            // hash上报
            this.captureEvents(['hashchange'], 'hash-pv')// 监听hash变化
        }
        if (this.data.domTracker) {
            this.targetKeyReport()
        }
        if (this.data.jsError) {
            this.jsError()
        }
    }
    //dom 事件上报
    private targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target as HTMLElement // 获取dom 并断言成HTMLElement类型，因为HTMLElement类型上有getAttribute方法，Element类型上没有
                const targetValue = target.getAttribute('target-key')// 获取自定义属性
                if (targetValue) {
                    this.sendTracker({// 上报
                        targetKey: targetValue,
                        event
                    })
                }
            })
        })
    }
    //js和promise错误收集
    private jsError() {
        this.errorEvent()
        this.promiseReject()
    }
    //捕获js报错 ===> error事件 读取error对象的message属性 上报日志
    private errorEvent() {
        window.addEventListener('error', (event ) => {
            this.sendTracker({
                targetKey: 'message',
                event: 'error',
                message: event.message
            })
        })
    }
    //捕获promise 错误 reject ===> unhandledrejection事件 返回一个promise对象 利用catch方法捕获错误
    private promiseReject() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.sendTracker({
                    targetKey: "reject",
                    event: "promise",
                    message: error
                })
            })
        })
    }

    //上报方法 通过navigator.sendBeacon
    private reportTracker<T>(data: T) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() }) // 数据和时间
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob)
    }
}