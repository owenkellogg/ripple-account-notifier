# Ripple Notifier

Designed to be a highly-scalable Ripple notification architecture that can monitor many Ripple accounts
at the same time, and POST notifications to any desired https endpoint.

## Usage

The Notifier class starts a long-running process that uses Zeromq to accept and reply to messages. Two
messages can be sent to the notifier process. Never stop the main Notifier process but rather connect
to it from another system process via ZeroMQ.

    var notifier = new Notifier({
      port: 'tcp://127.0.0.1:7777'
    })

    notifier.start()

You can add as many monitors as you would like.

    RN.addMonitor({
      account: 'stevenzeiler',
      notificationURL: 'https://127.0.0.1:5000/ripple/notifications'
    })

You can also remove existing monitors.

    RN.removeMonitor({
      account: 'stevenzeiler',
      notificationURL: 'https://127.0.0.1:5000/ripple/notifications'
    })

