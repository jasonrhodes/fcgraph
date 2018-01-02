import React from 'react'
import { DateTime } from 'luxon'

export default ({ date, format = 'DATE_FULL' }) => {
  const dt = DateTime.fromISO(date)
  if (typeof format === 'string') {
    format = DateTime[format]
  }
  return <span>{dt.toLocaleString(format)}</span>
}