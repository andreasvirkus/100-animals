process.env.VUE_APP_VERSION = require('./package.json').version

const config = {
  pwa: {
    serviceWorker: false,
    workboxOptions: {
      skipWaiting: true
    }
  }
}

module.exports = config
