import React from 'react'
import styles from './circleavatar.module.css';
import { useNavigate } from 'react-router-dom';
function CircleAvatar(props) {
  const navigate = useNavigate();
  return (
    <div className={styles.circleavatar} style={{width:props.radius*2,height:props.radius*2,backgroundImage:'url("'+props.image+'")'}}/>
  )
}

export default CircleAvatar