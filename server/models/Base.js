const db = require('../db')

module.exports = class BaseModel {
  constructor({ table }) {
    this.db = db
    this.table = table
  }

  runAsync(...args) {
    return new Promise((resolve, reject) => {
      this.db.run(...args, function runCallback(err) {
        if (err) {
          reject(err)
          return
        }
        resolve(this)
      })
    })
  }

  get(id) {
    return this.db.getAsync(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
  }

  list() {
    return this.db.allAsync(`SELECT * FROM ${this.table}`)
  }

  create(item) {
    const keys = Object.keys(item)
    const values = keys.map((key) => item[key])
    const COLUMNS = keys.join(', ')
    const PLACEHOLDERS = keys.map(() => '?').join(', ')
    const sql = `INSERT INTO ${this.table} (${COLUMNS}) VALUES (${PLACEHOLDERS})`
    return this.runAsync(sql, values)
  }

  update(id, item) {
    const keys = Object.keys(item)
    const values = keys.map((key) => item[key])
    const UPDATES = keys.map((key) => `${key} = ?`).join(', ')
    const sql = `UPDATE ${this.table} SET ${UPDATES} WHERE id = ?`
    values.push(id)
    return this.runAsync(sql, values)
  }

  delete(id) {
    const sql = `DELETE FROM ${this.table} WHERE id = ?`
    return this.runAsync(sql, [id])
  }
}