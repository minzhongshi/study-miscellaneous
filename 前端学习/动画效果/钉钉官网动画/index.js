const items = document.querySelectorAll('.list-item');
const playGround = document.querySelector('.playground');
const list =  document.querySelector('.list');

function createAnimation(scrollStart,scrollEnd, valueStart,valueEnd) {
    return function (scroll) {
        if (scroll<=scrollStart) {
            return valueStart;
        }
        if (scroll>=scrollEnd) {
            return  valueEnd;
        }
        return (
            valueStart +
            (valueEnd-valueStart)
                * (scroll-scrollStart)
                / (scrollEnd-scrollStart)
        )
    }
}

const animationMap = new Map();

function getDomAnimation(scrollStart, scrollEnd, dom){
    /**
     * 不同时间出现
     */
    scrollStart = scrollStart + dom.dataset.order * 600;
    const opacityAimation = createAnimation(scrollStart,scrollEnd,0,1)
    /**
     * 渐变
     * @param scroll
     * @returns {*}
     */
    const opacity = function (scroll) {
        return opacityAimation(scroll);
    }

    const  scaleAnimation = createAnimation(scrollStart,
        scrollEnd,0.5,1)
    // 横向移动位置
    const xAnimation = createAnimation(scrollStart, scrollEnd,
        list.clientWidth / 2 -dom.offsetLeft - dom.clientWidth / 2,
        0
        )
    //纵向移动位置
    const yAnimation = createAnimation(scrollStart, scrollEnd,
        list.clientHeight / 2 -dom.offsetTop - dom.clientHeight / 2,
        0
    )
    /**
     * 放大倍率
     * @param scroll
     * @returns {`scale(${*})`|`scale(${*})`|`scale(${*})`}
     */
    const transform = function(scroll) {
        return `translate(${xAnimation(scroll)}px, ${yAnimation(scroll)}px) scale(${scaleAnimation(scroll)})`
    }
    return {
        opacity,
        transform
    }
}

function updadeMap() {
    animationMap.clear();
    const playGroundReact = playGround.getBoundingClientRect();
    const scrollStart = playGroundReact.top + window.scrollY;
    const scrollEnd = playGroundReact.bottom + window.scrollY - window.innerHeight;
    for (const  item of items){
        animationMap.set(item, getDomAnimation(scrollStart
        ,scrollEnd,item))
    }
}

updadeMap();

function updateStyles() {
    const scroll = window.scrollY;
    for (let [dom, value] of animationMap){
        for (const cssProp in value) {
            dom.style[cssProp] = value[cssProp](scroll);
        }
    }
}

updateStyles();

window.addEventListener('scroll', updateStyles);