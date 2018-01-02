import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import withQuery from '../../helpers/withQuery'
import Player from '../../components/AddPlayerForm'

const ADD_PLAYER = gql`
mutation AddPlayer($input: AddPlayerInput) {
  addPlayer(input: $input) {
    id
  }
}
`
const GET_DATA = gql`
query GetData {
  clubs {
    id
    name
  }
  countries {
    code
    name
    flag
  }
}
`

export default compose(
  graphql(ADD_PLAYER, { name: 'addPlayer' }),
  graphql(GET_DATA, { name: 'data' })
)(withQuery(Player))