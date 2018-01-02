import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PlayerList from '../components/PlayerList'
import withQuery from '../helpers/withQuery'

const QUERY = gql`
query {
  players {
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

export default graphql(QUERY)(withQuery(PlayerList))