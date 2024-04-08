const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 8878,
    proxy: {
      '/api': {
        target: 'http://localhost:8877',
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        }
      }
    }
  }
})
