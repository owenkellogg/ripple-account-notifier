# Ripple Notifier

Designed to be a highly-scalable Ripple notification architecture that can monitor many Ripple accounts
at the same time, and POST notifications to any desired https endpoint.

## Configuration

All configuration is done via ENVIRONMENT variables, the following are required:

- RIPPLE_REST_URL
- DEFAULT_NOTIFICATION_URL
- PORT (defaults to 5000)
- HOST (defaults to 127.0.0.1)

## REST API

#### Monitor account

Enable monitoring of payments sent to and from the account, which are recorded in the
local Ripple Sync database and become queryable.

````
POST /accounts/:account/monitor
````
Request Parameters:
  - notification_url (overrides default from environment)
  - last_hash (optional)

Response Body:
  - uid
  - account
  - last_hash
  - state
  - notification_url

#### Get Monitor Status
````
GET /accounts/:account/monitor
````
Response Body:
  - uid
  - account
  - last_hash
  - state
  - notification_url


#### Stop Monitoring

Disable monitoring of payments sent to and from the account. Monitoring can be resumed
at the point in history where terminated.

````
DELETE /accounts/:account/monitor
````

#### List Notifications

All incoming payments are recorded and added to the notifications queue, which can be
viewed and cleared out after processing.

````
GET /accounts/:account/notifications
````

#### Clear Notification

````
DELETE /accounts/:account/notificiations/:hash
````

#### Clear All Notifications

````
DELETE /accounts/:account/notificiations
````

