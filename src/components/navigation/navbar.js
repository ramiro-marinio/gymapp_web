import React from 'react'
import styles from './navbar.module.css';
import NavigationLink from './navlink';
import UserPlate from '../auth/components/userplate/userplate';
import IconButton from '../icons/iconbutton';
function NavBar() {
  return (
    <div className={styles.navbar}>
      <label htmlFor='my-drawer-2'>
      <IconButton icon={'menu'} enabled onPressed={()=>{

      }}/>
      </label>
      <UserPlate/>
    </div>
  )
}

export default NavBar