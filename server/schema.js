const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
type Player {
  name: String!
  club: Club
  clubHistory(
    first: Int,
    last: Int
  ): PlayerClubsConnection
  country: String!
}

type Club {
  name: String!
  players: [Player!]
  league: League!
  since: String
}

type League {
  name: String!
  country: String!
  clubs: [Club!]
}

type Query {
  players: [Player!]
  playersByLeague(league: String!): [Player!]
  playersByCountry(country: String!): [Player!]
  clubs: [Club!]
  leagues: [League!]
  player(name: String!): Player
  club(name: String!): Club
}

type PlayerClubsConnection {
  edges: [PlayerClubsEdge]
}

type PlayerClubsEdge {
  node: Club
  start: String!
  end: String
}
`

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});