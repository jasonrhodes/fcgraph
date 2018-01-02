const BaseModel = require('./Base')

function allNullValues(object) {
  return Object.keys(object).map((key) => object[key]).every((value) => value === null)
}

class ClubsModel extends BaseModel {
  
  listForPlayer(playerId) {
    const sql = `
      SELECT c.name, c.league, poc.startDate
      FROM ${this.table} as c
      LEFT JOIN playersOnClubs as poc
      ON c.id = poc.club
      WHERE poc.player = ?
    `
    return this.db.allAsync(sql, [playerId])
  }

  getCurrentForPlayer(playerId) {
    const sql = `
      SELECT c.name, c.league, max(poc.startDate) as since
      FROM ${this.table} as c
      INNER JOIN playersOnClubs as poc
      ON c.id = poc.club
      WHERE poc.player = ? AND poc.endDate IS NULL
      GROUP BY poc.player
    `
    return this.db.getAsync(sql, [playerId]).then((club) => {
      if (allNullValues(club)) {
        return { name: 'Unassigned' }
      }
      return club
    })
  }

  listForLeague(league) {
    const sql = `
      SELECT id, name
      FROM ${this.table}
      WHERE league = ?
    `
    return this.db.allAsync(sql, [league])
  }
}

module.exports = new ClubsModel({ table: 'clubs' })