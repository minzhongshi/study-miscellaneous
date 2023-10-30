/**
 * 解析歌词字符串
 * 得到一个歌词对象数组
 * @returns {Array} 歌词对象数组
 * @example
 * parseLrc({time:'[00:00.000]', words:'你的泪光'})
 */
// JS match() 方法
// match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
function parseLrc() {
    let lrcArr = LRC.split('\n')
    let lrcObjArr = []
    for (let i = 0; i < lrcArr.length; i++) {
        let lrcObj = {}
        let time = lrcArr[i].match(/\[(.*)\]/)
        let words = lrcArr[i].match(/\](.*)/)
        if (time) {
            lrcObj.time = parseTime(time[1])
            lrcObj.words = words[1]
            lrcObjArr.push(lrcObj)
        }
    }
    return lrcObjArr
}


/**
 * 解析时间字符串,转换为数字
 * @param time 时间字符串
 * @returns {number} 时间数字
 */
function parseTime(time) {
    let timeArr = time.split(':')
    return +timeArr[0] * 60 + +timeArr[1]
}

let lrcData = parseLrc()

let doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('ul'),
    container: document.querySelector('.container')
}

/**
 * 计算出当前时间应该播放的歌词索引
 * 如果没有任何一句歌词的时间小于当前时间，那么就返回 -1
 * 最后一句歌词的时间是无限大，所以要特殊处理，返回最后一句
 * @returns {Number} 应该播放的歌词索引
 */
function findIndex() {
    let currentTime = doms.audio.currentTime
    let lrc = lrcData
    for (let i = 0; i < lrc.length; i++) {
        if (currentTime < lrc[i].time) {
            return i - 1
        }
    }
    return lrcData.length - 1
}

/**
 * 创建歌词元素
 */
function createLrcElements() {
    let frag = document.createDocumentFragment()
    for (let i = 0; i < lrcData.length; i++) {
        let li = document.createElement('li')
        li.textContent = lrcData[i].words
        frag.appendChild(li)
    }
    doms.ul.appendChild(frag)
}

createLrcElements()


let containerHeight = doms.container.clientHeight // 容器高度
let liHeight = doms.ul.children[0].clientHeight // 每一行的高度
let maxOffset = doms.ul.clientHeight - doms.container.clientHeight // 最大偏移量
/**
 * 设置UL偏移量
 */
function setOffset() {
    let index = findIndex()
    let offset =index * liHeight + liHeight / 2 - containerHeight / 2
    if (offset < 0) {
        offset = 0
    }
    // 去掉所有的active
    let li = doms.ul.querySelector('.active')
    if (li) {
        li.classList.remove('active')
    }
    // 给当前行添加active
    li = doms.ul.children[index]
    if (li){
        li.classList.add('active')
    }
    doms.ul.style.transform = `translateY(-${offset}px)`
    if (offset > maxOffset) {
        offset = maxOffset
    }

}

doms.audio.addEventListener('timeupdate', setOffset)