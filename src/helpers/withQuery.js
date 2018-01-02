import React from 'react'

export default (Component) => (props) => {
  const { data } = props

  if (data.loading) {
    return <p>Loading query...</p>
  }

  if (data.error) {
    return <p>An error occurred: {data.error.message}</p>
  }

  return <Component {...props} {...data} />
}