const BaseModel = require('./Base')

class PlayersModel extends BaseModel {

  /**
   * Creates a player-club relationship
   * 
   * @param {Object} options
   * @param {Number} options.playerId
   * @param {Number} options.clubId
   * @param {String} options.startDate - date player signed with team
   * @param {Number} options.number - number the player wore on this team 
   */
  addToClub({ player, club, startDate, number }) {
    const sql = `
      INSERT INTO playersOnClubs
      (player, club, startDate, number)
      VALUES (?, ?, ?, ?)
    `
    return this.runAsync(sql, [player, club, startDate, number])
  }

  /**
   * Gets all players ever for a given club 
   * 
   * @param {Number} clubId 
   */
  listForClub(clubId) {
    const sql = `
      SELECT p.name, p.country, poc.startDate
      FROM ${this.table} as p
      LEFT JOIN playersOnClubs as poc
      ON p.id = poc.player
      WHERE poc.club = ?
    `
    return this.db.allAsync(sql, [clubId])
  }

  /**
   * Gets all current players for a given club or clubs
   * 
   * @param {Number} clubId 
   */
  listForCurrentClub(clubIds) {
    if (!Array.isArray(clubIds)) {
      clubIds = [clubIds]
    }
    const PLACEHOLDERS = clubIds.map(() => '?').join(', ')
    const sql = `
      SELECT p.name, p.country, poc.club as clubId, max(poc.startDate) as since
      FROM ${this.table} as p
      LEFT JOIN playersOnClubs as poc
      ON p.id = poc.player
      WHERE poc.club IN (${PLACEHOLDERS}) AND poc.endDate IS NULL
      GROUP BY poc.player
    `
    return this.db.allAsync(sql, clubIds)
  }

  listForLeague(league) {
    return listForLeague(league).then((clubs) => {
      const clubIds = clubs.map(({ id }) => id)
      return this.listForCurrentClub(clubIds)
    })
  }

  /**
   * Gets all players who are from the given country,
   * specified by ISO 2-char code
   * 
   * @param {String} code 
   */
  listForCountry(code) {
    const sql = `
      SELECT * FROM ${this.table} as p
      WHERE country = ?
    `
    return this.db.allAsync(sql, [code])
  }
}

module.exports = new PlayersModel({ table: 'players' })