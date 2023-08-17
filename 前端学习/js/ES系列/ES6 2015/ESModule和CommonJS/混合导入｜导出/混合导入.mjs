import theSay , { name, age as  bookAuthor } from './混合导出.mjs'
console.log(
    theSay(),     // hello , world  5
    name,       // smz
    bookAuthor  // 18
)

// 导出的属性被合并到 mes 属性上， export 被导入到对应的属性上，
// export default 导出内容被绑定到 default 属性上。 theSay 也可以作为被 export default 导出属性。
import theSay2, * as mes from './混合导出.mjs'
console.log(
    theSay2(), // hello , world  5
    mes // {age: '18',default: [Function: say],name: 'smz'}
)


