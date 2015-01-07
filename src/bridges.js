
var BridgesApplication = require('bridges-application')

var application = new BridgesApplication({
  directory: __dirname
})

application.supervisor.start()

