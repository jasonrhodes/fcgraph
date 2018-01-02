import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerList from '../components/PlayerList'
import withQuery from '../helpers/withQuery'
import { Link } from 'react-router-dom'

const QUERY = gql`
query GetPlayersByCountry($countryCode: String!) {
  country(code: $countryCode) {
    name
    flag
  }
  playersByCountry(countryCode: $countryCode) {
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

const CountryPage = ({ playersByCountry = [], country, ...props }) => (
  <div>
    <Link to='/'>&larr; Back to all players</Link>
    <h1>Country: {country.name}</h1>
    <PlayerList {...props} players={playersByCountry} />
  </div>
)

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: {
      countryCode: match.params.countryCode
    }
  })
})(withQuery(CountryPage))