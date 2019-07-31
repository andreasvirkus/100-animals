const getId = require('./utils/getId')
const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log('Function `rooms-delete` invoked')
  return client.query(q.Get(q.Collection('rooms')))
    .then((response) => {
      console.log('all rooms', response.data)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response.data)
      })
    }).catch((error) => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}


exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  console.log(`Function 'room-delete' invoked. delete id: ${id}`)
  return client.query(q.Delete(q.Ref(`classes/rooms/${id}`)))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
