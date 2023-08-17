// 第一种方式：重定向导出 module 中的所有导出属性， 但是不包括 module 内的 default 属性。
// 第二种方式：从 module 中导入 name ，author ，say 再以相同的属性名，导出。
// 第三种方式：从 module 中导入 name ，重属名为 bookName 导出，从 module 中导入 author ，重属名为 bookAuthor 导出，正常导出 say 。


export * from '/module.mjs' // 第一种方式
export { name, age, say } from './module.mjs' // 第二种方式
export {   name as bookName ,  age as bookAuthor , say } from './module.mjs' //第三种方式
