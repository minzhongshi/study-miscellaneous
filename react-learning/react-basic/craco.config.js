// 扩展webpack的配置
const path = require('path')
// 引入辅助函数
const { whenProd, getPlugin, pluginByName } = require('@craco/craco')

module.exports = {
    // webpack 配置
    webpack: {
        // 配置别名
        alias: {
            // 约定：使用 @ 表示 src 文件所在路径
            '@': path.resolve(__dirname, 'src')
        },
        // 配置CDN
        configure: (webpackConfig) => {
            let cdn = {
                js: []
            }
            // 生产环境配置
            whenProd(() => {
                // 排除打包
                // key: 不参与打包的包(由dependencies依赖项中的key决定)
                // value: cdn文件中 挂载于全局的变量名称 为了替换之前在开发环境下
                webpackConfig.externals = {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-quill': 'ReactQuill'
                }
                // 配置现成的cdn资源地址
                // 实际开发的时候 用公司自己花钱买的cdn服务器
                cdn = {
                    js: [
                        'https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js',
                        'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js',
                        'https://cdn.jsdelivr.net/npm/react-quill@2.0.0/lib/index.min.js'
                    ]
                }
            })
            // 通过 htmlWebpackPlugin插件 在public/index.html注入cdn资源url
            const { isFound, match } = getPlugin(
                webpackConfig,
                pluginByName('HtmlWebpackPlugin')
            )

            if (isFound) {
                // 找到了HtmlWebpackPlugin的插件
                match.options.cdn = cdn
            }
            return webpackConfig
        }
    },
}