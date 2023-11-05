# css样式声明

## 1. 选择器

### 1.1 选择器的分类

- 基础选择器
  - 元素选择器
  - 类选择器
  - id选择器
  - 通配符选择器
    `*`选中所有元素
  - 属性选择器
    根据属性名和属性值选中元素，
    其他匹配规则可查看文档：[属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors)
  ```css
    /*选择标签上有attr属性的元素*/
    [attr] {
        color: red;
    }
    /*选择标签上有attr属性且属性值为value的元素*/
    [attr="value"] {
        color: red;
    }
    /*选择标签上有attr属性且属性值以value开头的元素*/
    [attr~="value"] {
        color: red;
    }
   ```
  - 伪类选择器
    选中某些元素的某种状态
    其他伪类选择器可查看文档：[伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)
    ```css
    /*选中第一个元素*/
    :first-child {
        color: red;
    }
    /*选中最后一个元素*/
    :last-child {
        color: red;
    }
    /*选中第一个元素*/
    :nth-child(1) {
        color: red;
    }
    /*选中第偶数个元素*/
    :nth-child(2n) {
        color: red;
    }
    /*超链接未访问时选中元素*/
    :link {
        color: red;
    }
    /*超链接已访问时选中元素*/
    :visited {
        color: red;
    }
    /*鼠标悬停时选中元素*/
    :hover {
        color: red;
    }
    /*鼠标按下时选中元素*/
    :active {
        color: red;
    }
    ```
  - 伪元素选择器
    生成并选中某个元素内部的第一个子元素或最后一个子元素，并不止于此。
    其他伪元素选择器可查看文档：[伪元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements)
    ```css
    /*生成子元素，并且是第一个元素*/
    ::before {
        /*元素内容*/
        content: 'before';
    }
    /*生成子元素，并且是最后一个元素*/
    ::after {
        content: 'after';
    }
    ```
    
- 组合选择器
  - 并且选择器 --- 
    ```css
    /*选中div并且有类选择器box的元素*/
    div.box {
        color: red;
    }
    ```
  - 后代选择器 --- 空格
    ```css
    /*选中div下的所有p元素*/
    div p {
        color: red;
    }
    ```
  - 子代选择器 --- >
    ```css
    /*选中div下的所有p元素,不包含子元素的子元素*/
    div > p {
        color: red;
    }
    ```
  - 相邻兄弟选择器 --- +
    ```css
    /*选中div元素的下一个元素p元素*/
    div + p {
        color: red;
    }
    ```
  - 通用兄弟选择器 --- ~
    ```css
    /*选中div之后的所有p元素*/
    div ~ p {
        color: red;
    }
    ```
- 选择器的并列
    - 逗号
        ```css
        /*选中div元素和p元素*/
        div, p {
            color: red;
        }
        ```

### 1.2 选择器的优先级
!important > 内联样式 > id选择器 > 类选择器 > 元素选择器 > 通配符选择器 > 继承 > 浏览器默认样式

### 1.3 选择器的权重计算（层叠）
- 比较重要性
  作者样式表中的!important > 作者样式表中的普通样式 > 浏览器默认样式
- 比较特殊性
  选择器选中范围约窄的 > 选择器选中范围约宽的
  
  具体规则 ：计算选择器中内联样式、id选择器、类选择器、元素和伪元素选择器的个数，按照内联样式、id选择器、类选择器、元素和伪元素选择器、顺序进行比较，个数多的优先级高，如果个数相同，则比较下一个选择器的个数，以此类推。 
- 比较顺序 
  代码靠后的优先级高
  

### 1.4 选择器的继承性
- 可继承的属性
  - 字体系列属性
        font、font-family、font-size、font-style、font-variant、font-weight、font-size-adjust、font-stretch
  - 文本系列属性
        text-indent、text-align、text-shadow、line-height、word-spacing、letter-spacing、text-transform、direction、color
  - 表格布局属性
        caption-side、border-collapse、border-spacing、empty-cells、table-layout
  - 列表布局属性
        list-style-type、list-style-image、list-style-position、list-style
  - 光标属性
        cursor
  - 元素可见性
        visibility
  - 媒体相关属性
        page-break-before、page-break-after、page-break-inside、orphans、widows

## 2.属性值的计算
 >特殊的css取值
- inherit
  继承父元素的属性值
- initial
  使用浏览器默认的属性值
