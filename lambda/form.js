const got = require('got')

exports.handler = async (event, context, callback) => {
  // Budget honeypot
  console.log('Event body:', event.body)
  const body = JSON.parse(event.body)
  const { formName, check } = body
  console.log('parsed', formName, check)
  if (formName !== 'reg' || check !== 'must-reg') {
    return callback(null, { statusCode: 403 })
  }

  console.log('Body received:', event.body)

  // Post to Google Sheets
  const res = got(process.env.FORM_WEBHOOK_URL, {
    body,
    json: true,
    form: true,
    method: 'POST'
  })
  callback(null, { statusCode: 200 })
}
