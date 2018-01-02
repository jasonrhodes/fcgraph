import React from 'react'
import { Link } from 'react-router-dom'

export default function EntityTag({
  entity,
  urlBase,
  id = entity.id,
  text = entity.name
}) {
  return (
    <Link style={{
      display: 'inline-block',
      backgroundColor: 'rgba(0,0,0,0.1)',
      fontSize: '0.75em',
      borderRadius: '3px',
      padding: '5px 10px'
    }} to={`${urlBase}/${id}`}>{text}</Link>
  )
}

export function ClubTag(props) {
  return <EntityTag urlBase='/clubs' entity={props.club} {...props} />
}

export function CountryTag(props) {
  const { country } = props
  return (
    <EntityTag
      urlBase='/countries'
      entity={country}
      text={`${country.flag} ${country.name}`}
      id={country.code}
    />
  )
}

export function LeagueTag(props) {
  return <EntityTag urlBase='/leagues' entity={props.league} />
}

export function PlayerTag(props) {
  return <EntityTag urlBase='/players' entity={props.player} />
}