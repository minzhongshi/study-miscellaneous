/**
 * 瀑布流布局
 *  参数计算：
 *   设置父容器的宽度：作为整个瀑布流布局的宽度 === waterfallsWidth
 *   设置子容器的宽度：作为每一列的宽度 === itemWidth
 *   计算列数：Math.floor(waterfallsWidth / itemWidth) === columns
 *   计算间距：(waterfallsWidth - columns * itemWidth) / (columns - 1) === gap
 *   计算每一列的高度：columnsHeight = [] ===数组长度就是列数，数组的每一项就是每一列的高度
 *   计算每一列的left值：left = index * (itemWidth + gap)
 *   计算每一列的top值：top = columnsHeight[index]
 *  布局：
 *    每次图片放在高度最小的那一列
 */

const waterfalls = document.querySelector('.waterfall');
const imgWidth = 220;
let columnsHeight = []

//创建元素
function creatImg() {
    let oFrag = document.createDocumentFragment();
    for (let i = 0;i<30;i++){
        let img = document.createElement('img');
        img.src = `https://picsum.photos/id/1${i}/220/${Math.floor(Math.random() * 301 + 100)}`;
        img.style.display = 'none'
        oFrag.appendChild(img);
    }
    waterfalls.appendChild(oFrag);
}
creatImg()

//监听图片加载完成
let imgList = document.querySelectorAll('img');
let imgArr = Array.from(imgList);
let imgLoad = [];
imgArr.forEach((img,index) => {
    img.onload = function () {
        imgLoad.push(index);
        if (imgLoad.length === imgArr.length){
            render();
        }
    }
})

window.addEventListener('resize',function () {
    render();
})

//渲染
function render() {
    let {columns,gap} = getinfo();
    columnsHeight = new Array(columns).fill(0);
    for (let i = 0;i<imgArr.length;i++){
        let {left,top,index} = layout(gap);
        imgArr[i].style.left = left + 'px';
        imgArr[i].style.top = top + 'px';
        imgArr[i].style.display = 'block';
        columnsHeight[index] += imgArr[i].offsetHeight + gap/2;
    }
    let {min} = getMinIndex(columnsHeight);
    waterfalls.style.height = min + 'px';
}


//获取每张图片的位置
function layout(gap) {
    let {min,index} = getMinIndex(columnsHeight);
    let left = index * (imgWidth + gap);
    let top = min + gap / 2;
    console.log(top)
    return {
        left,
        top,
        index
    }
}

//获取信息
function getinfo() {
    let waterfallWidth = waterfalls.offsetWidth;
    let columns = Math.floor(waterfallWidth / imgWidth);
    let gap = (waterfallWidth - columns * imgWidth) / (columns - 1);
    if (gap < 15) gap = 15;
    return {
        columns,
        gap
    }
}

//求最小值，并返回第几列
function getMinIndex(arr) {
    let min = Math.min(...arr);
    let index = arr.findIndex(item => item === min);
    return {
        min,
        index
    }
}