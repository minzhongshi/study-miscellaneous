import layoutStr from "./rule.js";
import order from "./order.js";

const container = document.querySelector(".container");

/**
 * 将字符串分割成数组
 * @param layoutStr
 */
function divisionStr(layoutStr) {
    const layout = layoutStr.split("");
    let arr = [];
    let str = "";
    for(let i = 0; i < layout.length; i++){
        if(layout[i] === "["){
            str = "";
        }else if(layout[i] === "]"){
            arr.push(str.split("|"));
        }else if(layout[i] === "-"){
            arr.push("-");
        } else{
            str += layout[i];
        }
    }
    return arr;
}

/**
 * 创建元素方法
 * @type {number}
 */
function creation(layout, order) {
    const len = layout.length;
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.width = "100%";
    div.dataset.index = index;
        const sum = sums(layout);
        for(let i = 0; i < len; i++){
            const div1 = document.createElement("div");
            let temp = layout[i]
            if (temp === "-"){
                temp = 1;
            }
            div1.style.display = "flex";
            div1.style.width = 100*temp/sum + "%";
            div1.style.height = "70px";
            div1.style.marginTop = "20px";
            if (temp === 1){
                div1.innerText = order[index];
            }else{
                div1.innerText = order[index][i];
            }
            if (fontWeight(div1.innerText)){
                div.style.fontWeight = "bold";
            }
            if (isTitle(div1.innerText)){
                div.style.fontWeight = "800";
                div.style.fontSize = "25px";
                div.style.color = "#0E8ADB";
            }
            div.appendChild(div1);
        }
        index++;
    container.appendChild(div);
}

/**
 * 判断是否加粗
 */
function fontWeight(str) {
    return str.indexOf("：") !== -1;
}

/**
 * 判断是否史标题
 */
function isTitle(str) {
    return str === "教育背景" || str === "专业技能" || str === "工作经历" || str === "校园经历" || str === "自我评价";
}

/**
 * 计算数组中的和
 * @type {number}
 */
function sums(arr) {
    let sum = 0;
    if (arr === "-")return 1;
    for(let i = 0; i < arr.length; i++){
        sum += +arr[i];
    }
    return sum;
}

let index = 0;
function generPaper(layoutStr, order){
    const layout = divisionStr(layoutStr);
    for(let i = 0; i < layout.length; i++){
            creation(layout[i], order)
    }
}

generPaper(layoutStr, order)