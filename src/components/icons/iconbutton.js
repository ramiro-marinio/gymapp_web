import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from './icon';
import styles from './iconbutton.module.css';
function IconButton(props) {
  const enabled = props.enabled ?? true;
  return (
    <div className={`btn ${!enabled ? 'btn-disabled' : null} btn-neutral m-2 btn-circle w-12`} onClick={enabled ? props.onPressed : null}> <Icon name={props.icon}/> </div>
  )
}

IconButton.propTypes = {
    icon:PropTypes.string,
    onPressed:PropTypes.func,
    enabled:PropTypes.bool,
}

export default IconButton
