module.exports = function(routes, controllers) {

  routes.post('/accounts/:account/monitor', controllers.monitors.create)
  routes.delete('/accounts/:account/monitor', controllers.monitors.stop)

  routes.get('/accounts/:account/notifications', controllers.notifications.index)
  routes.delete('/accounts/:account/notifications/:hash', controllers.notifications.clear)
  routes.delete('/accounts/:account/notifications', controllers.notifications.clearAll)
}

