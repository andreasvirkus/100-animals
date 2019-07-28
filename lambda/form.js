const got = require('got')
const requestOptions = {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  method: 'POST',
  cache: 'no-cache'
}

exports.handler = async (event, context, callback) => {
  // Budget honeypot
  console.log('Event body:', event.body)
  const { formName, check } = JSON.parse(event.body)
  console.log('parsed', formName, check)
  if (formName !== 'reg' || check !== 'must-reg') {
    return callback(null, { statusCode: 403 })
  }

  console.log('Body received:', event.body)

  // Post to Google Sheets
  const res = await got.post(process.env.FORM_WEBHOOK_URL, {
    body: event.body
  })
  callback(null, { statusCode: 200 })
}
