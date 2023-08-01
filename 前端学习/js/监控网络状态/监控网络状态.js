//场景:
//  (1)渲染图片时网络不好，可以降低图片质量
//  (2)提示使用者网络状态，可能导致体验降低
//  (3)根据网络情况预加载些东西

//API: navigator.connection
// value:
// downlink:10 网速
// effectiveType:"4g" 识别出来的网络类型，和使用网络无关，与网速和延迟综合得来
// onchange:null
// rtt:0 延迟
// saveData:false

//API:  navigator.onLine 
//value: false:离线   true:在线

//触发事件:
// window.addEventListener('online',updateInfo) 离线变为在线触发该事件
// window.addEventListener('offline',updateInfo) 在线变为离线触发该事件
// navigator.connection.addEventListener('change', updateInfo()) 网络发生变化时触发该事件

function updateInfo() {
   return  navigator.connection.downlink; // 预估下载速度m/s
}

