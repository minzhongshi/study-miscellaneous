/**
 * 状态 存 取 删 方法
 */

const USE = 'persist:user'


 function getToken() {
     const user = JSON.parse(localStorage.getItem(USE));
     return JSON.parse(user.user).token ? JSON.parse(user.user).token : ''
}


export {
    getToken,
}