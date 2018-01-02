import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerList from '../components/PlayerList'
import withQuery from '../helpers/withQuery'
import { Link } from 'react-router-dom'

const QUERY = gql`
query GetPlayersByClub($club: Int!) {
  club(id: $club) {
    name
  }
  playersByClub(club: $club) {
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

const ClubPage = ({ playersByClub = [], club, ...props }) => (
  <div>
    <Link to='/'>&larr; Back to all players</Link>
    <h1>Club: {club.name}</h1>
    <PlayerList {...props} players={playersByClub} />
  </div>
)

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: {
      club: parseInt(match.params.clubId, 10)
    }
  })
})(withQuery(ClubPage))