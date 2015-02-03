var RippleAccountMonitor = require('ripple-account-monitor')
var Promise              = require('bluebird')
var RIPPLE_REST_URL      = process.env['RIPPLE_REST_URL']

var monitors = {}

class Monitor {

  constructor(address) {
    this.address = address
  }

  static start(address, options) {
    return new this(address).start(options)
      .then(function(monitor) {
        monitors[address] = monitor
        return Promise.resolve(monitor)
      })
  }

  static stop(address, options) {
    return this.find(address)
      .then(function(monitor) {
        return monitor.stop(options) 
      })
  }

  static find(address) {
    if (monitors[address]) {
      return Promise.resolve(monitors[address])
    } else {
      return Promise.reject(new Error('monitor not found'))
    }
  }

  start() {
    var _this = this
    new Monitor({ address: this.address }).fetch()
      .then(function(monitor) {
        var ripple = new RippleMonitor(monitor, function(transaction) {
          return new Notification({ transaction: transaction })
            .save().then(function(notification) {
              return Promise.resolve();
            })
        })
        ripple.start()
      })
  }

  stop(options) {
    if (this.monitor) {
      return this.monitor.stop()
    }
    return Promise.resolve()
  }

}

module.exports = Monitor

