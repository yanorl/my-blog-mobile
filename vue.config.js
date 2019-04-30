// vue.config.js
const webpack = require('webpack')
module.exports = {
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "./src/assets/scss/main.scss";`
            }
        }
    },
    configureWebpack: {
        devServer: {
            proxy: {
                //名字可以自定义，这里我用的是api
                '/api': {
                  target: 'https://leancloud.cn/',//设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true,//这里设置是否跨域
                  pathRewrite: {
                    '^/api': ''
                  }
                }
            }
        }
    }
}