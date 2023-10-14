/**
 * 格式化一个日期
 * 存在多种调用方式，传入的参数有多种，导致函数分支特别多，不利于维护
 *
 *   formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') // 2020-01-01 12:12:12
 *   formatDate(new Date(), 'yyyy-MM-dd') // 2020-01-01
 *   formatDate(new Date(), 'yyyy年MM月dd日 hh时mm分ss秒') // 2020年01月01日 12时12分12秒
 *   formatDate(new Date(), 'yyyy年MM月dd日') // 2020年01月01日
 *   formatDate(new Date(), 'MM-dd hh:mm') // 01-01 12:12
 *   formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss 星期w') // 2020-01-01 12:12:12 星期三
 *
 *  优化：
 *    参数归一化：将参数统一为对象，对象中包含了所有的参数
 *    找到一种最灵活的分支方式，将其他分支都转换为这种分支
 */

function _formatNormalize(fmt) {// 参数归一化,返回一个函数
    if (typeof fmt === 'function') {
        return fmt
    }
    if (typeof fmt !== 'string') {
        throw new TypeError('fmt must be a string or function')
    }
    if (fmt === 'date') {
        fmt ='yyyy-MM-dd'
    }else if (fmt === 'datetime') {
        fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    return (dateInfo)=>{
        const {yyyy, MM, dd, hh, mm, ss, ms} = dateInfo

        function _getWeek(w) {
            switch (w) {
                case 0:
                    return '日'
                case 1:
                    return '一'
                case 2:
                    return '二'
                case 3:
                    return '三'
                case 4:
                    return '四'
                case 5:
                    return '五'
                case 6:
                    return '六'
            }
        }

        return fmt.replace('yyyy',yyyy).
            replace('MM',MM).
            replace('dd',dd).
            replace('hh',hh).
            replace('mm',mm).
            replace('ss',ss).
            replace('ms',ms).
            replace('w',_getWeek(dateInfo.w))
    }
}
function formatDate(date, fmt,isPad = false) {
   fmt = _formatNormalize(fmt)
    // 获取日期信息
    const dateInfo = {
        yyyy: date.getFullYear(),
        MM: date.getMonth() + 1,
        dd: date.getDate(),
        hh: date.getHours(),
        mm: date.getMinutes(),
        ss: date.getSeconds(),
        ms: date.getMilliseconds(),
        w: date.getDay()
    }
    // 是否补零
    dateInfo.yyyy = isPad ? String(dateInfo.yyyy).padStart(4,'0') : dateInfo.yyyy
    dateInfo.MM = isPad ? String(dateInfo.MM).padStart(2,'0') : dateInfo.MM
    dateInfo.dd = isPad ? String(dateInfo.dd).padStart(2,'0') : dateInfo.dd
    dateInfo.HH = isPad ? String(dateInfo.hh).padStart(2,'0') : dateInfo.HH
    dateInfo.mm = isPad ? String(dateInfo.mm).padStart(2,'0') : dateInfo.mm
    dateInfo.ss = isPad ? String(dateInfo.ss).padStart(2,'0') : dateInfo.ss
    dateInfo.ms = isPad ? String(dateInfo.ms).padStart(3,'0') : dateInfo.ms
    return fmt(dateInfo)
}

console.log(formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')) // 2020-01-01 12:12:12
console.log(formatDate(new Date(), 'yyyy-MM-dd')) // 2020-01-01
console.log(formatDate(new Date(), 'yyyy年MM月dd日 hh时mm分ss秒') )// 2020年01月01日 12时12分12秒
console.log(formatDate(new Date(), 'yyyy年MM月dd日')) // 2020年01月01日
console.log(formatDate(new Date(), 'MM-dd hh:mm')) // 01-01 12:12
console.log(formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss 星期w')) // 2020-01-01 12:12:12 星期三
console.log(formatDate(new Date(), 'date')) // 2020-01-01