const { countries } = require('./data')
const playersModel = require('./models/players')
const clubsModel = require('./models/clubs')
const leaguesModel = require('./models/leagues')
const controller = {} = module.exports

controller.addPlayer = (_, { input }) => {
  const { club, startDate, number, ...player } = input
  return playersModel.create(player).then((created) => {
    const id = created.lastID
    return playersModel.addToClub({ player: id, club, startDate, number }).then(() => {
      return { id, ...player }
    })
  })
}

controller.addClub = (_, { input }) => {
  return clubsModel.create(input).then(({ lastID }) => ({
    id: lastID,
    ...input
  }))
}