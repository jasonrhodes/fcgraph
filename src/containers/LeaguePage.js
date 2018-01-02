import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerList from '../components/PlayerList'
import withQuery from '../helpers/withQuery'
import { Link } from 'react-router-dom'

const QUERY = gql`
query GetPlayersByLeague($id: String!) {
  league(id: $id) {
    name
  }
  playersByLeague(leagueId: $id) {
    id
    name
    imageSrc
    country {
      code
      name
      flag
    }
    club {
      id
      name
      league {
        id
        name
      }
      since
    }
  }
}
`

const LeaguePage = ({ playersByLeague = [], league, ...props }) => (
  <div>
    <Link to='/'>&larr; Back to all players</Link>
    <h1>League: {league.name}</h1>
    <PlayerList {...props} players={playersByLeague} />
  </div>
)

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: {
      id: match.params.leagueId
    }
  })
})(withQuery(LeaguePage))