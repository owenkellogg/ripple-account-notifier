var RIPPLE_REST_URL = process.env['RIPPLE_REST_URL'] || 'https://api/ripple.com'
var POLL_TIMEOUT    = process.env['POLL_TIMEOUT'] || 2000
var Promise         = require('bluebird')
var Notification    = require(__dirname+'/../models').Notification

class RippleMonitor {

  constructor(monitor, onTransaction) {
    this.record = monitor
    this.monitor = new RippleAccountMonitor({
      rippleRestUrl: RIPPLE_REST_URL,
      account: monitor.get('account'),
      lastHash: monitor.get('last_hash'),
      timeout: POLL_TIMEOUT,
      onTransaction: function(transaction, next) {
        onTransaction().then(next).error(next)
      }
    })
  }
}

module.exports = RippleMonitor

