const http = 'localhost:8877'
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 8878,
    proxy: {
      '/api': {
        target: `http://${http}`,
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        },
        timeout: 60 * 1000
      },
      '/auth': {
        target: `http://${http}`,
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        },
        timeout: 60 * 1000
      }
    }
  },
  configureWebpack: {

  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'TSG Image Captioning';
      args[0].build = new Date().getTime();
      args[0].env = process.env.NODE_ENV;
      return args;
    })
  },
  transpileDependencies: true,
  lintOnSave: false
})
