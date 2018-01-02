import React from 'react'
// import PlayerSummary from './PlayerSummary'
import PlayerRow from './PlayerRow'
import PlayerPane from './PlayerPane'

const allowedViews = ['list', 'grid']

export default class PlayerList extends React.Component {
  state = {
    view: 'list'
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem) {
      const view = localStorage.getItem('playerListView')
      view && this.changeView(view)
    }
  }

  changeView(view) {
    if (!allowedViews.includes(view)) {
      return
    }
    this.setState({ view })
    if (localStorage && localStorage.setItem) {
      localStorage.setItem('playerListView', view)
    }
  }

  renderViewButtons() {
    const { view } = this.state
    return (
      <div style={{ marginBottom: '20px' }}>
        <button disabled={view === 'list'} onClick={() => this.changeView('list')}>List View</button>
        <button disabled={view === 'grid'} onClick={() => this.changeView('grid')}>Grid View</button>
      </div>
    )
  }

  renderView() {
    const { players = [] } = this.props
    const { view } = this.state
    if (view === 'list') {
      return (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>League</th>
              <th>Country</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => <PlayerRow key={player.id} {...player} />)}
          </tbody>
        </table>
      )
    }
    if (view === 'grid') {
      return (
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          paddingTop: '20px'
        }}>
          {players.map((player) => <PlayerPane key={player.id} {...player} />)}
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.renderViewButtons()}
        {this.renderView()}
      </div>
    )
  }
}
