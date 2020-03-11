'use strict';

const aws = require('aws-sdk')
const sns = new aws.SNS({ region: 'eu-central-1' })

module.exports.addResponse = (event, context, callback) => {
  sns.publish(
    {
      Message: JSON.stringify(event.body),
      TopicArn: process.env.snsTopicArn
    }
  ).promise()
  .then(() => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Event sent!',
        data: event.body
      })
    })
  })
  .catch(error => {
    callback(null, {
      statusCode: 501,
      body: JSON.stringify(error)
    })
  })
}
