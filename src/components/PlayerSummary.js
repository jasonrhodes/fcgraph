import React from 'react'
import { Link } from 'react-router-dom'
import Line from './layout/Line'

const PlayerSummary = ({ id, name, imageSrc, country, club }) => (
  <div>
    <h4 style={{ marginBottom: 0 }}>
      <Link to={`/players/${id}`}>
        {imageSrc && <span><img src={imageSrc} alt={name} style={{
          width: '100px',
          height: 'auto'
        }} /><br /></span>}
        <span>{name}</span>
      </Link>
      <span> </span>
      <span title={country.name} style={{ fontSize: '1.5em' }}>{country.flag}</span>
    </h4>
    <Line><Link to={`/clubs/${club.id}`}>{club.name}</Link> (since {club.since})</Line>
  </div>
)

export default PlayerSummary