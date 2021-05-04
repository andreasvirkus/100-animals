const got = require('got')

exports.handler = async (event) => {
  // Budget honeypot
  console.log('Event body:', event.body)
  const body = JSON.parse(event.body)
  const { formName, check } = body
  console.log('parsed', formName, check)
  if (!['reg', 'confirm'].includes(formName) || check !== 'must-reg') {
    return { statusCode: 403, body: JSON.stringify({ status: false }) }
  }

  // Post to Google Sheets
  await got.post(process.env.FORM_WEBHOOK_URL, { json: body })

  // await new Promise((resolve) => setTimeout(resolve, 2000))
  return { statusCode: 200, body: JSON.stringify({ status: true }) }
}
