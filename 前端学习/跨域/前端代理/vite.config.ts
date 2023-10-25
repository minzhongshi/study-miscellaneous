import {defineConfig} from 'vite'

export default defineConfig({
    server:{
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                // rewrite 用来替换/api前缀的，这里替换成了空字符串===>http://localhost:3000/json
                // rewrite:(path)=>path.replace(/^\/api/,'erp'),
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log(`代理请求：${proxyReq.method} ${proxyReq.protocol}${proxyReq.host}${proxyReq.path} `)
                    })
                }
            },
            '/erp-shelve-api':{
                target:'http://erp.uat.cn',
                changeOrigin:true,
                configure: (proxy, options) => {
                    proxy.on('proxyReq', (proxyReq, req, res) => {
                        console.log(`代理请求：${proxyReq.method} ${proxyReq.protocol}${proxyReq.host}${proxyReq.path} `)
                    })
                }
            }
        }
    }
})