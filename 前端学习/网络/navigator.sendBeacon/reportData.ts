const reportData = () =>{
    //统计停留时间
    let startTime = performance.now(); // 进入页面的时间点
    let logVisit = async function() {
        if (!navigator.sendBeacon) return false;

        const endTime = performance.now(); // 页面卸载的时间点

        let data = new FormData();
        const reportDataList = {
            name: 'smz',
            page: 'home',
            stayTime: ((endTime - startTime)/60000).toFixed(2) + '分钟' // 用户停留时间
        };
        let time = new Blob([JSON.stringify(reportDataList)],{type:'application/json; charset=UTF-8'})
        navigator.sendBeacon("http://localhost:3001/api/b", time);
    };
    window.addEventListener("beforeunload", logVisit);
}
reportData()
