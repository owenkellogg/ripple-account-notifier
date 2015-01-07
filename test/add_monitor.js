var path = require('path')
RN       = require(path.join(__dirname, '/../'))

describe('Adding Monitors Live', function() {

  it('should connect to the live process and receive confirmation', function(done) {

    RN.addMonitor({
      account: 'nerdylocks',
      notificationURL: 'http://127.0.0.1:5000/notifications'    
    })
    .then(done)
    .error(done)
  })

})

