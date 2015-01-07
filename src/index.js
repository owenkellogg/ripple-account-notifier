var Promise = require('bluebird')
var zeromq  = require('zmq')

var port = process.env.PORT || 'tcp://127.0.0.1:7777'

class RippleNotifier {
  
  constructor(options) {
    var options_ = options || {}
  }

  static addMonitor(options) {
    var socket = zeromq.socket('req')
    return new Promise(function(resolve, reject) {
      socket.connect(port)
      socket.send(JSON.stringify(options)) 
      socket.on('message', function(data) {
        try {
          message = JSON.parse(data)
          console.log('DATA', message)
        } catch(e) {
          console.log('error parsing message', data)
        }
        socket.disconnect(port)
        resolve()
      })
    })
  }

  start() {
    var socket = zeromq.socket('rep')
    socket.bind(port)
    console.log('reply socket connected to port', port)

    socket.on('message', function(data) {
      var message
      try {
        message = JSON.parse(data)
        console.log('DATA', message)
        socket.send(JSON.stringify({ success: true }))
      } catch(e) {
        console.log('error parsing message', data)
        socket.send(JSON.stringify({ success: false }))
      }
    });
  }
}

module.exports = RippleNotifier

