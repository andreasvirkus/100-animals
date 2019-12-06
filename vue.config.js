process.env.VUE_APP_VERSION = require('./package.json').version

const config = {
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass') // This line must in sass option
      }
    }
  },
  pwa: {
    serviceWorker: false,
    workboxOptions: {
      skipWaiting: true
    }
  }
}

module.exports = config
