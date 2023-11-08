# Clipboard API
## 介绍
Clipboard API 用于在网页中复制和粘贴数据到系统剪贴板中，它是一个异步 API，因为它需要用户的允许。它可以让网页在不使用 Flash 的情况下复制和粘贴数据到系统剪贴板中。

## 对象
`navigator.clipboard`提供了访问剪贴板的方法和属性。
## 事件
`clipboard`对象上有两个事件，分别是`copy`和`paste`，分别在复制和粘贴时触发。

## 方法
`clipboard`对象上有两个方法，分别是`readText`和`writeText`，分别用于读取和写入剪贴板中的文本。
## 示例
```js
// 读取剪贴板中的文本
navigator.clipboard.readText().then(text => {
  console.log('Pasted content: ', text);
});
// 写入剪贴板中的文本
navigator.clipboard.writeText('Hello world!').then(() => {
  console.log('Copying to clipboard was successful!');
}, () => {
  console.log('Could not copy text: ');
});
```
