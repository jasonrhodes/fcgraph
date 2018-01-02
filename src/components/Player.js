import React from 'react'
import { Link } from 'react-router-dom'
import { SmallCapsLabel } from './layout'
import Date from './Date'
import { ClubTag } from './EntityTag'

const spaceBelow = (n = 20) => ({
  paddingBottom: `${n}px`
})

const Player = ({ playerById: player }) => (
  <div>
    <div style={{ width: '45%', float: 'right', paddingTop: '60px' }}>
      {player.imageSrc && <img alt={player.name} src={player.imageSrc} style={{ width: '100%', height: 'auto' }} />}
    </div>
    <div style={{ width: '45%', float: 'left' }}>
      <Link to='/'>&larr; Back to player list</Link>
      <p style={{ fontSize: '2em', lineHeight: '1.5', marginBottom: 0 }}><span style={{ position: 'relative', top: '3px' }}>{player.country.flag}</span> <span style={{ textTransform: 'uppercase', fontSize: '0.5em', letterSpacing: '0.1em', color: 'rgba(0,0,0,0.4)', verticalAlign: 'middle' }}>{player.country.name}</span></p>
      <h1 style={{ marginTop: 0 }}>{player.name}</h1>
      <p style={{ marginBottom: '30px' }}>
        <SmallCapsLabel>Current Club</SmallCapsLabel>
        <ClubTag club={player.club} /> (since <Date date={player.club.since} />)
      </p>
      <p style={{ marginBottom: '5px' }}><SmallCapsLabel>Club History</SmallCapsLabel></p>
      <table style={{ fontSize: '0.85em' }}>
        <tbody>
        {player.clubHistory.edges.map(({ node, start, onLoanFrom }) => (
          <tr key={node.id}>
            <td style={spaceBelow(10)}><Date date={start} format={{ month: 'short', year: 'numeric' }} /></td>
            <td style={spaceBelow(10)}>
              <ClubTag club={node} />
              {onLoanFrom && <span> (on loan from <ClubTag club={onLoanFrom} />)</span>}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  </div>
)

export default Player