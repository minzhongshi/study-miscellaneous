let width = window.innerWidth;
let height = window.innerHeight;
let number  = 14;
let line = Math.ceil(height / (width / number));
const container = document.querySelector('.container');

for (let i = 0; i <= line; i++) {
    let div = document.createElement('div');
    div.className = 'line';
    container.appendChild(div);
    let fragment = document.createDocumentFragment();
    for (let j = 0; j < number + 1; j++) {
        let div2 = document.createElement('div');
        div2.className = 'item';
        // 添加随机背景图片
        div2.style.backgroundImage = `url(https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/200/200)`;
        fragment.appendChild(div2);
    }
    div.appendChild(fragment);
}

const items = document.querySelectorAll('.item');


// 添加鼠标移入事件
for (let i = 0; i < items.length; i++) {
    items[i].addEventListener('mouseenter', function (e) {
        let arr = getAround(items,i);
        this.style.transform = 'scale(1.3)';
        arr.forEach(item => {
            if (item) {
                item.style.transform = 'scale(0.8)';
            }
        })
    })
    items[i].addEventListener('mouseleave', function (e) {
        let arr = getAround(items,i);
        arr.forEach(item => {
            if (item) {
                item.style.transform = 'scale(1)';
            }
        })
        this.style.transform = 'scale(1)';
    })
}


//获取当前节点周围元素方法
const getAround = (node,index) => {
    let arr = [];
    let n = number+ 1;
    arr.push(node[index+1]);
    arr.push(node[index - n ]);
    arr.push(node[index + n]);
    if (index % n !== 0) {
        arr.push(node[index-1]);
    }
    if ((parseInt(index / n)+1) % 2 === 0) {
        arr.push(node[index -n -1])
        arr.push(node[index +n -1])
    }else {
        arr.push(node[index -n +1])
        arr.push(node[index +n +1])
    }
    return arr;
}
