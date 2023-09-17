import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import {PostcssPxToViewport} from "./plugins/postcss=px-to-viewport";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
        additionalData: `@import"./src/views/BEM架构与layout布局/index.scss";`
      }
    },
    postcss:{
      plugins:[PostcssPxToViewport()]
    }
  }
})
