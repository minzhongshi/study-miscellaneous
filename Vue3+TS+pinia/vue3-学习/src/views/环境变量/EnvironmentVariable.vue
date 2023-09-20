<template>

</template>

<script setup lang="ts">
/**
 * 场景：各个环境下存在某些差异，比如请求地址不同，方便测试做的一些测试功能，
 * 这些在不同环境下都是不同的，所以需要一些环境变量来控制
 * 自带的环境变量存在于 import.meta.env 中
 *  BASE_URL: "/"  ===>路由应用前缀
 * DEV: true  ===>npm run dev 设置为true 当前运行环境开发环境
 * MODE: "development" ===》当前运行环境
 * PROD: false ===>npm run build 生产环境
 * SSR: false ===》服务端渲染
 *
 * 这些环境变量可修改，但是不要做动态修改 import.meta.env[BASE_URL] = 'BASE_URL'，
 * 生产环境是硬编码，写死的
 */
/**
 * 自定义环境变量
 * 在根目录下创建.env.xxxx文件
 * 如开发环境变量文件：.env.development
 *    生产环境变量文件：.env.production
 *
 * 以VITE_开头自定义环境变量
 * 在 package.json 中 在dev补充 "dev":--mode development ===> "vite --mode development",
 * 生产环境会默认读取.env.production文件内容，不用配置
 * 开发环境也会默认读取.env.development文件内容，不用配置
 *
 * 生产环境在打包好后无法在本地直接运行index.html，需要为他开启一个服务
 *   安装 http-server ：npm install http-server -g
 *   开启服务：在打包文件下（dist）执行命令 http-server -p 9002 就可以在本地查看效果
 */

/**
 * 在vite.config中读取环境变量，
 * 因为是Node环境编译无法通过import.meta.env读取环境变量需要进行改造
 *  使用 process.env 可读取到机器的环境变量，但是读取不到我们定义的环境变量
 *  需要使用 Vite 的 loadEnv 包 ，loadEnv接收两个参数
 *  第一个为运行环境，第二个为目录
 *  运行环境Vite知道，所以这里需要对导出做改造 将其变成箭头函数，再将配置 return返回
 *  回调返回mode就是当前环境，将其作为第一个参数传入 loadEnv
 *  再通过process.cwd()获取当前项目根目录，将其作为第二个参数传入 loadEnv
 *  最终就可以读到环境变量了
 */

console.log(import.meta.env)
</script>

<style scoped>

</style>