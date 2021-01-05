module.exports = {
    // devServer: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: 8080,
    //     https: false,
    //     //以上的ip和端口是我们本机的;下面为需要跨域的
    //     proxy: {//配置跨域
    //         '/api': {
    //             target: 'http://47.103.51.105:5005',//这里后台的地址模拟的;应该填写你们真实的后台接口
    //             ws: true,
    //             changOrigin: true,//允许跨域
    //             pathRewrite: {
    //                 '^/api': ''//请求的时候使用这个api就可以
    //             }
    //         }

    //     }
    // },
    
    publicPath: '', // 相对于 HTML 页面（目录相同）hiistory模式下
    productionSourceMap: false,
    //rem
    lintOnSave: true,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16, // 换算的基数
                        selectorBlackList: [], // 忽略转换正则匹配项
                        propList: ['*'],
                    }),
                ]
            }
        }
    },
}
