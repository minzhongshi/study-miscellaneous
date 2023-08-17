let str = 'hello'

let str2 = ''
for (let i= str.length;i>0;i--) {
    str2+=str.at(i-str.length-1)
}
console.log(str2)//olleh

let str3 = ''
for (let i= str.length-1;i>=0;i--) {
    str3+=str[i]
}
console.log(str3)//olleh

