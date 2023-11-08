const audioEle = document.querySelector('audio');
const cvs = document.querySelector('canvas');
const ctx = cvs.getContext('2d');

//初始化画布，处于屏幕中央
function initCvs() {
    const { width, height } = document.body.getBoundingClientRect();
    cvs.width = width ;
    cvs.height = height * 2;
    cvs.style.position = 'fixed';
    cvs.style.top = '30%';
    cvs.style.left = '0';
    cvs.style.zIndex = -1;
    cvs.style.background = 'rgba(0, 0, 0, 0)';
}

initCvs()

//绘制音频可视化，圆形环绕、颜色渐变
function draw(data, max) {
    const { width, height } = cvs;
    const radius = Math.min(width, height) / 4; // 半径
    const centerX = width / 2; // 圆心
    const centerY = height / 2;// 圆心
    const step = 2 * Math.PI / data.length; // 每个数据点的弧度
    const gradient = ctx.createLinearGradient(centerX-2 * radius, 0, centerX+radius, 0);// 颜色渐变
    gradient.addColorStop(0,"black");
    gradient.addColorStop(0.3,"magenta");
    gradient.addColorStop(0.5,"blue");
    gradient.addColorStop(0.6,"green");
    gradient.addColorStop(0.8,"yellow");
    gradient.addColorStop(1,"red");
    ctx.clearRect(0, 0, width, height); // 清空画布
    ctx.lineWidth = 2;// 设置线宽
    ctx.strokeStyle = gradient;// 设置颜色
    ctx.beginPath();// 开始绘制
    for (let i = 0; i < data.length; i++) {
        const x = centerX + radius * Math.cos(i * step);
        const y = centerY + radius * Math.sin(i * step);
        ctx.moveTo(x, y);// 移动到圆上的点
        ctx.lineTo(1 + x + data[i] / max * radius * Math.cos(i * step), y + data[i] / max * radius * Math.sin(i * step));
    }
    ctx.closePath();// 结束绘制
    ctx.stroke();// 绘制路径
}


draw(new Array(256).fill(0), 255)

let isInit = false, analyser, dataArray;
audioEle.onplay = function (){
    if (isInit) return;
    isInit = true;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(audioEle);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
}
function update() {
    requestAnimationFrame(update)
    if (!isInit) return;
    analyser.getByteFrequencyData(dataArray);
    const offset = Math.floor((dataArray.length) *2 / 3);
    const data = new Array(offset * 2)
    for (let i = 0; i < offset; i++) {
        data[i] = data[data.length - i - 1] = dataArray[i];
    }
    draw(data, 255);
}
update()