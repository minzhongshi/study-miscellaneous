import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css:{
    // 预处理器
    preprocessorOptions: {
      scss:{
        additionalData: `@import"./src/views/BEM架构与layout布局/index.scss";`
      }
    }
  }
})
