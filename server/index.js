const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const cors = require('cors')
const schema = require('./schema')
const players = require('./models/players')

// players.listForClub(3).then((result) => console.log('all for club 3', result))

// players.update(11, {
//   name: 'Raul Pogba'
// }).then((result) => console.log('update result', result))

// players.delete(9).then((result) => console.log('delete result', result))
// players.list().then((result) => console.log('list result', result))

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(process.env.PORT || 4400)