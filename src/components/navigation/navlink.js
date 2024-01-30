import React from 'react';
import styles from './navlink.module.css';
import { useNavigate } from 'react-router-dom';
import Icon from '../icons/icon';
function NavigationLink(props) {
  const navigate = useNavigate();
  return (
    <div onMouseDown={()=>{navigate(props.route)}} className={styles.navlink}><Icon name={props.icon}/>{props.title}</div>
  )
}

export default NavigationLink