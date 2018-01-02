import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import withQuery from '../helpers/withQuery'
import Player from '../components/Player'

const QUERY = gql`
query GetPlayer($id: Int!) {
  playerById(id: $id) {
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
      since
      league {
        id
        name
      }
    }
    clubHistory {
      edges {
        node { 
          id
          name
        }
        start
        onLoanFrom {
          id
          name
        }
      }
    }
  }
}
`

export default graphql(QUERY, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id
    }
  })
})(withQuery(Player))