import React from 'react'

const defaultStyles = {
  color: 'rgba(0,0,0,0.4)',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  display: 'block',
  marginBottom: '4px'
}

export default ({ children, style }) => (
  <span style={{ ...defaultStyles, ...style }}>{children}</span>
)