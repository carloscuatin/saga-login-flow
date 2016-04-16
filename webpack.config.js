require('babel-register')

var getConfig = require('hjs-webpack')

var config = getConfig({
  in: 'app/index.js',
  out: 'public',
  clearBeforeBuild: true
})

module.exports = config
