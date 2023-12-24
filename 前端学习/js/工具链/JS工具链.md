# JS工具链解决的问题
> 主要解决兼容性和语言增强层面的问题

## 兼容性问题

- API兼容
 1. polyfill(填充)
  > 在环境不支持的情况下，通过在原生对象上添加方法来实现兼容

   ```javascript
    if (!Array.prototype.forEach) {
      Array.prototype.forEach = function(callback, thisArg) {
         var T, k;
         if (this == null) {
            throw new TypeError(' this is null or not defined');
         }
         var O = Object(this);
         var len = O.length >>> 0;
         if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
         }
         if (arguments.length > 1) {
            T = thisArg;
         }
         k = 0;
         while (k < len) {
            var kValue;
            if (k in O) {
              kValue = O[k];
              callback.call(T, kValue, k, O);
            }
            k++;
         }
      };
    }
   ```
    
   
  >可以通过 core-js 来实现polyfill
    
    ```javascript
    import 'core-js';
    ```
    
- 语法兼容
> 通过babel来实现语法兼容，利用代码转换的方式，将高版本的语法转换为低版本的语法，babel本身不具备转换能力，借助各类插件来实现转换

  ```javascript
  // 安装babel
    // @babel/preset-env 用于转换ES6+语法，基础预设
    // @babel/cli 用于命令行转换
    // @babel/core babel的核心包
  npm install --save-dev @babel/core @babel/cli @babel/preset-env
  // 配置babel
  {
    "presets": ["@babel/preset-env",
      // 预设配置
    {
        // 兼容浏览器版本
      "targets": {
        "chrome": "58",
        "ie": "11"
      },
        // 按需导入 usage
        // 使用core-js
      "useBuiltIns": "usage",
      "corejs": "3.6.5"
    }
  ]
  }
  // 使用babel
  npx babel src --out-dir lib
  ```