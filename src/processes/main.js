var path     = require('path')
var Notifier = require(path.join(__dirname, '/../../'))

module.exports = function() {

  new Notifier().start()
}

