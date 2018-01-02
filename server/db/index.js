const { Database } = require('sqlite3')
const bluebird = require('bluebird')

const db = new Database('./db/fcgraphdata')
bluebird.promisifyAll(db)

module.exports = db