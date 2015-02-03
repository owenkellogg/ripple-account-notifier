
module.exports = function(models, lib) {

  return {
    create: function(req, res, next) {

      lib.Monitor.start(req.params.address)
        .then(function(monitor) {
          res.status.send({
            success: true,
            monitor: monitor
          })
        })
        .error(next)
    },

    stop: function(req, res, next) {

      lib.Monitor.stop(req.params.address)
        .then(function(monitor) {
          res.status.send({
            success: true,
            monitor: monitor
          })
        })
        .error(next)
    }
  }
}

