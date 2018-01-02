import React from 'react'
import { Link } from 'react-router-dom'
import { ClubTag, LeagueTag, CountryTag } from './EntityTag'

const PlayerRow = ({ id, name, imageSrc, country, club }) => (
  <tr>
    <td>{name}</td>
    <td><ClubTag club={club} /></td>
    <td><LeagueTag league={club.league} /></td>
    <td><CountryTag country={country} /></td>
    <td>
      <Link to={imageSrc}>
        <img src={imageSrc} alt={name} style={{
          width: '50px',
          height: 'auto'
        }} />
      </Link>
    </td>
  </tr>
)

export default PlayerRow