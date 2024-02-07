import React from 'react';
import styles from './navlink.module.css';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../icons/icon';
function NavigationLink(props) {
  const navigate = useNavigate();
  return (
    <label htmlFor='my-drawer-2'>
      <div onClick={()=>{navigate(props.route)}} className={styles.navlink + ' rounded-md'}>
        <div className={'mr-2'}>
          <Icon name={props.icon}/>
        </div>
        <div className='w-28'>
          {props.title}
        </div>
      </div>
    </label>
  )
}

export default NavigationLink