// Rabin-Karp
// 1. 计算模式串的hash值
// 2. 计算主串中每个长度为m的子串的hash值
// 3. 比较hash值，如果hash值不同，字符串必然不匹配；如果hash值相同，还需要使用朴素算法再次判断
const rabinKarp = (str, pattern) => {
    const getHash = (str) => {// 计算hash值
        let hash = 0 // hash值
        for (let i = 0; i < str.length; i++) {// 计算hash值
            hash = hash * 26 + (str[i].charCodeAt() - 'a'.charCodeAt())// 26进制
        }
        return hash
    }
    const patternHash = getHash(pattern)// 模式串的hash值
    let strHash = getHash(str.slice(0, pattern.length))// 主串中第一个子串的hash值
    if (strHash === patternHash) {// 如果hash值相同，还需要使用朴素算法再次判断
        return true
    }
    for (let i = 1; i < str.length - pattern.length + 1; i++) {// 计算主串中每个长度为m的子串的hash值
        strHash = strHash * 26 - (str[i - 1].charCodeAt() - 'a'.charCodeAt()) * Math.pow(26, pattern.length) + (str[i + pattern.length - 1].charCodeAt() - 'a'.charCodeAt())
        if (strHash === patternHash) {// 如果hash值相同，还需要使用朴素算法再次判断
            return true
        }
    }
    return false
}