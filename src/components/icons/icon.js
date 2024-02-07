import React from 'react'
import PropTypes from 'prop-types'

export function Icon(props) {
  return (
    <span style={{userSelect:'none'}} className="material-symbols-outlined notranslate">{props.name}</span>
  )
}

Icon.propTypes = {
  name:PropTypes.string
}
