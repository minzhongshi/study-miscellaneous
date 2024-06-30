# 路径配置

- 路径解析配置 使用craco插件（webpack） ：@ ===》 src
   - 安装craco
```
 pnpm i -D @craco/craco
```
   - 项目目录下创建配置文件 craco.config.js
   - 配置文件中添加路径解析配置
```javascript
const path = require('path');

module.exports = {
    webpack:{
        alias:{
            '@': path.resolve(__dirname, 'src')
        }
    }
}
```
   - 包文件中配置启动和打包命令
```
   "start": "craco start",
    "build": "craco build",
```


