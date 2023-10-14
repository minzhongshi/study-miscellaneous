/**
 * 文字在计算机中对应一个数字，一个字符占用16位，即2个字节
 * 当有些文字或者emoji表情超过了2个字节，就会占用两个码元
 *
 * 码点:真正一字符所占空间 0x0000-0x10FFFF
 * 码元：表示一个字符的16位空间 0x0000-0xFFFF
 *
 * 当读取字符串length时，会将码元的个数返回，而不是码点的个数，所以长度会不一样
 * 在取字符串内容时，会将码元转换为码点，所以内容可能会乱码
 *
 * 有些表情是由两个表情组合而成的，
 * /\p{Emoji_Presentation}/gu:匹配所有emoji表情
 *
 *
 */

//
const str = '2👀🐱‍🚀🌹😉💖🐱‍🏍🤢2'
// console.log(str.match(/\p{Emoji_Presentation}/gu)) // 匹配所有emoji表情
// console.log(str.length) // 22
// console.log(str[0]) // 乱码
// console.log(str.slice(0, 3)) // 乱码


String.prototype.pointLength = function () {
    let len = 0
    for (let i = 0; i < this.length; i++) {
        if (this.codePointAt(i) > 0xffff) {// 如果码点大于0xFFFF，说明是两个码元
            i++
        }
        len++
    }
    return len
}

String.prototype.pointCharAt = function (index = 0) {
    let curIndex = 0
    for (let i = 0; i < this.length; i++) {
        if (curIndex === index) {
            return String.fromCodePoint(this.codePointAt(i))
        }
        if (this.codePointAt(i) > 0xFFFF) {
            i++
        }
        curIndex++
    }
}

String.prototype.pointSlice = function (start = 0, end = this.pointLength()) {
    let str = ''
    const maxLen = this.pointLength()
    const len = end >maxLen? maxLen:end
    const minLen = start < 0 ? 0 : start
    for (let i = minLen; i < len; i++) {
        str += this.pointCharAt(i)
    }
    return str
}

const str2 = '2👀🐱2'
console.log(str2.pointLength()) // 4
console.log(str2.pointCharAt(2)) // 👀
console.log(str2.pointSlice(-2,6)) // 2👀🐱2

