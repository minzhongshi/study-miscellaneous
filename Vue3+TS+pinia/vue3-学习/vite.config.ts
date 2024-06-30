import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {PostcssPxToViewport} from "./plugins/postcss=px-to-viewport";
import vueJsx from "@vitejs/plugin-vue-jsx";
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default ({mode}:any)=>{
  console.log(loadEnv(mode,process.cwd()))
  return defineConfig({
    plugins: [
      legacy({
        targets: [
          '> 1%',
          'not ie 11',
          'not op_mini all',
          'chrome >= 78',
          'edge >= 78',
          'firefox >= 72',
          'safari >= 13',
          'opera >= 67',
        ],
      }),
        vue(),
        vueJsx(),
    ],
    // 别名配置
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "coms": path.resolve(__dirname, "src/components"),
      },
    },
    css:{
      // 预处理器
      preprocessorOptions: {
        scss:{
          // 布局          // 主题切换
          additionalData: `@import"./src/views/BEM架构与layout布局/index.scss";@import"./src/components/主题切换/index.scss";`
        }
      },
      postcss:{
        plugins:[PostcssPxToViewport()]
      }
    },
    // 打包配置
    esbuild:{
      //删除console.log和debugger
      pure:['console.log'],
      drop:['debugger','console']
    },
    build: {
      rollupOptions:{
        manualChunks: {
          vue:['vue'],
          elementPlus:['element-plus'],
          pinia:['pinia'],
          vueRouter:['vue-router']
        }
      }
    }
  })

}