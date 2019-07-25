process.env.VUE_APP_VERSION = require('./package.json').version

const config = {
  pwa: {
    name: 'WFAC2020',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#4DBA87',

    // configure the workbox plugin
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      skipWaiting: true
    }
  }
}

module.exports = config
