import React from 'react'
import PropTypes from 'prop-types'

export function Icon(props) {
  return (
    <span onClick={props.onPressed ?? null} style={{userSelect:'none'}} className={`material-symbols-outlined notranslate ${props.className}`}>{props.name}</span>
  )
}

Icon.propTypes = {
  onPressed:PropTypes.func,
  name:PropTypes.string,
  className:PropTypes.string,
}
