import ts from "rollup-plugin-typescript2";
import path from "path";
import dts from "rollup-plugin-dts";
import clear from 'rollup-plugin-clear';


export default [
    {
        input: './src/core/index.ts',
        output:[
            {
                file: path.resolve(__dirname, './dist/index.esm.js'),
                format: 'es'
            },
            {
                file: path.resolve(__dirname, './dist/index.cjs.js'),
                format: 'cjs'
            },
            {
                file: path.resolve(__dirname, './dist/index.js'),
                format: 'umd',
                name: 'SmzTracker'
            }
        ],
        plugins: [
             ts(), // 生成 .js 文件
                // clear({
                //     targets: ['dist']
                // })
        ]
    },
    {
        input: './src/core/index.ts',
        output: {
                file: path.resolve(__dirname, './dist/index.d.js'),
                format: 'es'
            },
        plugins: [dts.default()] // 生成 .d.ts 类型声明文件
    }
]