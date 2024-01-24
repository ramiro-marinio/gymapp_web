import React from 'react'
import styles from './navlink.module.css';
import { useNavigate } from 'react-router-dom';
function NavigationLink(props) {
  const navigate = useNavigate();
  return (
    <div onMouseDown={()=>{navigate(props.route)}} className={styles.navlink}>{props.title}</div>
  )
}

export default NavigationLink