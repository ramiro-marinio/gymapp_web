import React from 'react'
import styles from  './circleavatar.module.css'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function CirleAvatar(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.circleavatar} style={{width:props.radius*2,height:props.radius*2,backgroundImage:'url("'+props.image+'")'}}/>
  )
}

CirleAvatar.propTypes = {
  radius:PropTypes.number,
  image:PropTypes.string,
}

export default CirleAvatar
