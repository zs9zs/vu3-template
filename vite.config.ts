import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    viteMockServe({
      mockPath: './src/mock/source', // 解析刚刚user.ts的位置
      localEnabled: true // 是否开启开发环境
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 配置别名@ 设置 @ 指向 src 目录
    }
  },
  base: './', // 设置打包路径
  server: {
    port: 4000, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
    // 设置代理，根据我们项目实际情况配置（配置跨域）
    // proxy: {
    //   '/api': {
    //     target: 'http://xxx.xxx.xxx.xxx:8000',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace('/^\/api/', '')
    //   }
    // }
  }
})

/**
 * vite 报错：Dynamic require of "path" is not supported
 * 缘由：
 * 配置别名过程中引入path
 * const path = require('path');
 * '@': path.resolve(__dirname, '.src')
 * 原因：
 * vite 版本不支持 commonJS
 * 解决：
 * 改成 import { resolve } from 'path'
 */
