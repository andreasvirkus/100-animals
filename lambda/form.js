const fetch = require('node-fetch')
const fetchOptions = {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  method: 'POST',
  cache: 'no-cache'
}

exports.handler = async (event, context, callback) => {
  const res = await fetch(process.env.FORM_WEBHOOK_URL, {
    ...fetchOptions,
    body: event.body
  })

  callback(null, { statusCode: 200 })
}
