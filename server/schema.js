const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')
const typeDefs = `
type Country {
  code: String!
  name: String!
  flag: String
}

type Player {
  id: Int!
  name: String!
  club: Club
  country: Country
  imageSrc: String
}

# Need to make this extend from Player to get this connection working again
type FullPlayer {
  clubHistory(
    first: Int,
    last: Int
  ): PlayerClubsConnection
}

type Club {
  id: Int
  name: String!
  players: [Player!]
  league: League!
  since: String
}

type League {
  id: String
  name: String!
  country: Country
  clubs: [Club!]
}

type Query {
  player(id: Int!): Player
  players: [Player!]
  country(code: String!): Country
  club(id: Int!): Club
  clubs: [Club!]
  countries: [Country!]
  league(id: String!): League
  leagues: [League!]
  playersByCountry(countryCode: String!): [Player!]!
  playersByClub(club: Int!): [Player!]!
  alumniByClub(club: Int!): [Player!]!
  playersByLeague(leagueId: String!): [Player!]!
  playerByName(name: String!): Player
  playerById(id: Int!): Player
}

type Mutation {
  addPlayer(input: AddPlayerInput): Player
  addClub(input: AddClubInput): Club
  addLeague(input: AddLeagueInput): League
  addPlayerToClub(input: AddPlayerToClubInput): AddPlayerToClubPayload
}

input AddPlayerInput {
  name: String!
  country: String!
  club: Int!
  startDate: String!
  number: Int
}

input AddClubInput {
  name: String!
  league: String!
}

input AddLeagueInput {
  id: String!
  name: String!
  country: String!
}

type AddLeaguePayload {
  league: League
}

input AddPlayerToClubInput {
  playerId: Int!
  clubId: Int!
  startDate: String!
  number: Int
}

type AddPlayerToClubPayload {
  lolidk: String
}

type PlayerClubsConnection {
  edges: [PlayerClubsEdge]
}

type PlayerClubsEdge {
  node: Club
  start: String!
  onLoanFrom: Club
}
`

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});