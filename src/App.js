import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import HomePage from './containers/HomePage'
import PlayerPage from './containers/PlayerPage'
import ClubPage from './containers/ClubPage'
import CountryPage from './containers/CountryPage'
import LeaguePage from './containers/LeaguePage'

import AddPlayerPage from './containers/admin/AddPlayerPage'

const appStyle = {
  padding: '20px 40px'
}

const App = () => (
  <div style={appStyle}>
    <Router>
      <Switch>
        <Route path='/' exact={true} component={HomePage} />
        <Route path='/players/:id' component={PlayerPage} />
        <Route path='/clubs/:clubId' component={ClubPage} />
        <Route path='/countries/:countryCode' component={CountryPage} />
        <Route path='/leagues/:leagueId' component={LeaguePage} />

        <Route path='/admin/add-player' component={AddPlayerPage} />
      </Switch>
    </Router>
  </div>
)

export default App
