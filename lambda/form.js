const fetch = require('node-fetch')
const fetchOptions = {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  method: 'POST',
  cache: 'no-cache'
}

exports.handler = async (event, context, callback) => {
  // Budget honeypot
  const { formName, check } = JSON.parse(event.body)
  if (formName !== 'reg' || check !== 'must-reg') {
    return callback(null, { statusCode: 403 })
  }

  // Post to Google Sheets
  const res = await fetch(process.env.FORM_WEBHOOK_URL, {
    ...fetchOptions,
    body: event.body
  })
  console.log('result', res)
  callback(null, { statusCode: 200 })
}
