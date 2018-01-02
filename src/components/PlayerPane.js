import React from 'react'
import SmallCapsLabel from './layout/SmallCapsLabel'
import { Link } from 'react-router-dom'
import { ClubTag, LeagueTag, CountryTag } from './EntityTag'

const PlayerPane = ({ id, name, imageSrc, country, club }) => (
  <div style={{
    flex: '0 0 25%',
    padding: '0 6px 50px'
  }}>
    <div style={{
      border: '1px solid rgba(0,0,0,0.1)',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'rgba(255,255,255,0.7)',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
    }}>
      <div title={name} style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundPosition: 'top center',
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: 0,
        paddingBottom: '66.667%'
      }}>
        <Link title={name} style={{
          display: 'block',
          width: '100%',
          height: 0,
          paddingBottom: '66.667%'
        }} to={`/players/${id}`}>''</Link>
      </div>
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginTop: 0 }}>
          <Link to={`/players/${id}`}>{name}</Link>
        </h3>
        <p>
          <SmallCapsLabel>Club</SmallCapsLabel>
          <ClubTag club={club} />
        </p>
        <p>
          <SmallCapsLabel>League</SmallCapsLabel>
          <LeagueTag league={club.league} />
        </p>
        <p>
          <SmallCapsLabel>Country</SmallCapsLabel>
          <CountryTag country={country} />
        </p>
      </div>
    </div>
  </div>
)

export default PlayerPane