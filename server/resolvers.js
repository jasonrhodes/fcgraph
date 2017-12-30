const countries = require('./data/countries')
const players = require('./data/players')
const playersOnClubs = require('./data/playersOnClubs')
const clubs = require('./data/clubs')
const leagues = require('./data/leagues')

function getAllClubsForPlayer(playerId) {
  return playersOnClubs
    .filter((rel) => rel.player === playerId)
    .sort((a, b) => new Date(a.start).getTime() > new Date(b.start).getTime())
    .map((rel) => {
      const club = clubs.find((club) => club.id === rel.club)
      club.start = rel.start
      club.end = rel.end
      return club
    })
}

function getCurrentClubForPlayer(playerId) {
  const club = getAllClubsForPlayer(playerId).pop()
  club.since = club.start
  return club
}

module.exports = {
  Query: {
    players: () => players,
    clubs: () => clubs,
    leagues: () => leagues,
    playersByLeague: (_, { league }) => players.filter((player) => {
      const club = getCurrentClubForPlayer(player.id)
      const clubLeague = leagues.find((league) => league.id === club.league)
      return clubLeague && (clubLeague.id === league || clubLeague.name === league)
    }),
    playersByCountry: (_, { country }) => players.filter((player) => player.country === country),
    player: (_, { name }) => players.find((player) => player.name === name)
  },
  Player: {
    club: (player) => getCurrentClubForPlayer(player.id),
    clubHistory: (player) => getAllClubsForPlayer(player.id)
  },
  Club: {
    league: (club) => leagues.find((league) => league.id === club.league)
  },
  PlayerClubsConnection: {
    edges: (clubs) => clubs
  },
  PlayerClubsEdge: {
    node: ({ id, name, league }) => ({ id, name, league })
  }
}