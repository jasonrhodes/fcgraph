import React from 'react'

const InputWrapper = ({ children }) => (
  <div style={{ marginBottom: '15px' }}>
    {children}
  </div>
)

const Success = ({ children }) => (
  <div style={{ padding: '15px 30px', backgroundColor: '#A4F98B', color: 'rgba(0,0,0,0.7)', marginBottom: '30px' }}>
    {children}
  </div>
)

const defaultState = {
  name: '',
  country: 'none',
  club: 0,
  startDate: '',
  message: ''
}

export default class AddPlayerForm extends React.Component {
  state = defaultState

  submit = (e) => {
    const { addPlayer } = this.props
    const { name, country, club, startDate } = this.state

    e.preventDefault()

    if (!name || country === 'none' || club === 0 || !startDate) {
      return
    }

    const { message, ...input } = this.state

    addPlayer({ variables: { input }}).then(({ data }) => {
      const { addPlayer } = data
      this.setState({ ...defaultState, message: `Successfully created ${name} (ID: ${addPlayer.id})` })
      this.nameInput.focus()
    })
  }

  syncPlayer(key) {
    return (e) => this.setState({ [key]: e.target.value, message: '' })
  }

  render() {
    const { data } = this.props
    const { countries = [], clubs = [] } = data

    return (
      <div>
        <h1>Add Player</h1>
        {this.state.message && <Success>{this.state.message}</Success>}
        <form onSubmit={this.submit}>
          <InputWrapper>
            <label>Name</label><br />
            <input
              value={this.state.name}
              onChange={this.syncPlayer('name')}
              ref={(input) => this.nameInput = input}
            />
          </InputWrapper>
          <InputWrapper>
            <label>Country</label><br />
            <select value={this.state.country} onChange={this.syncPlayer('country')}>
              <option disabled value='none'>-- select a country --</option>
              {countries.map((country) => <option
                key={country.code}
                value={country.code}
              >{country.flag} {country.name}</option>)}
            </select>
          </InputWrapper>
          <InputWrapper>
            <label>Club</label><br />
            <select value={this.state.club} onChange={this.syncPlayer('club')}>
              <option disabled value={0}>-- select a club --</option>
              {clubs.map((club) => <option
                key={club.id}
                value={club.id}
              >{club.name}</option>)}
            </select>
          </InputWrapper>
          <InputWrapper>
            <label>Club Start Date</label><br />
            <input placeholder='YYYY-MM-DD' value={this.state.startDate} onChange={this.syncPlayer('startDate')} />
          </InputWrapper>
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}