import React from 'react'
import styles from  './circleavatar.module.css'
import PropTypes from 'prop-types';

function CirleAvatar(props) {
  return (
    <div className={styles.circleavatar + ' ' + props.className} style={{width:props.radius*2,height:props.radius*2,backgroundImage:'url("'+props.image+'")'}}/>
  )
}

CirleAvatar.propTypes = {
  radius:PropTypes.number,
  image:PropTypes.string,
  className:PropTypes.string,
}

export default CirleAvatar
