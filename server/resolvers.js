const {
  countries
} = require('./data')

const playersModel = require('./models/players')
const clubsModel = require('./models/clubs')
const leaguesModel = require('./models/leagues')

const controller = require('./controller')

function getAllClubsForPlayer(playerId) {  
  return clubsModel.listForPlayer(playerId).then((rels) => {
    return (rels.length === 0) ? [] : rels
      .sort((a, b) => new Date(a.startDate).getTime() > new Date(b.startDate).getTime())
      .map((rel) => {
        const club = clubs.find((club) => club.id === rel.club)
        club.rel = rel
        return club
      })
  })
}

function getCurrentClubForPlayer(playerId) {
  const unsigned = { name: 'Unsigned' }
  return clubsModel.getCurrentForPlayer(playerId).then((club = unsigned) => club)
}

function slugify(words) {
  return words.toLowerCase().replace(/[\s_]+/g, '-')
}

function getSortName({ name, sortName }) {
  if (sortName) {
    return sortName.toLowerCase()
  }
  const names = name.toLowerCase().split(' ')
  return `${names[1]} ${names[0]}`
}

function sortPlayers(players) {
  return players.sort((a, b) => getSortName(b) < getSortName(a))
}

module.exports = {
  Mutation: {
    addPlayer: controller.addPlayer,
    addClub: controller.addClub,
    addLeague: (_, { input }) => (console.log('add league', input), { league: input }),
    addPlayerToClub: (_, { input }) => (console.log('add player to club', input), { lolidk: 'yeah!' })
  },
  Query: {
    player: (_, { id }) => playersModel.get(id),
    players: () => playersModel.list().then((list) => sortPlayers(list)),
    club: (_, { id }) => clubsModel.get(id),
    clubs: () => clubsModel.list(),
    country: (_, { code }) => countries.find((country) => country.code === code),
    countries: () => countries,
    league: (_, { id }) => leaguesModel.get(id),
    leagues: () => leaguesModel.list(),
    playersByLeague: (_, { leagueId }) => playersModel.listForLeague(leagueId).then((list) => sortPlayers(list)),
    playersByCountry: (_, { countryCode }) => playersModel.listForCountry(countryCode).then((list) => sortPlayers(list)),
    playersByClub: (_, { club }) => playersModel.listForCurrentClub(club).then((list) => sortPlayers(list))
  },
  Player: {
    club: (player) => getCurrentClubForPlayer(player.id),
    // clubHistory: (player) => getAllClubsForPlayer(player.id),
    country: (player) => countries.find((country) => country.code === player.country),
    imageSrc: (player) => player.imageSrc || `/images/players/${(player.imageSlug || slugify(player.name))}-large.jpg`
  },
  Club: {
    league: (club) => leaguesModel.get(club.league).then((league = { name: 'n/a' }) => league)
  },
  League: {
    country: (league) => countries.find((country) => country.code === league.country)
  },
  PlayerClubsConnection: {
    edges: (clubs) => clubs.map(({ rel, ...club }) => ({ club, rel }))
  },
  PlayerClubsEdge: {
    node: ({ club }) => club,
    start: ({ rel }) => rel.start,
    onLoanFrom: ({ rel }) => clubs.find((club) => club.id === rel.onLoanFrom)
  }
}