import React from 'react'
import styles from './navbar.module.css';
import NavigationLink from './navlink';
import UserPlate from '../auth/components/userplate/userplate';
function NavBar() {
  return (
    <div className={styles.navbar}>
      <NavigationLink title='Home Page' route='/' icon='home'/>
      <NavigationLink title='My Gyms' route='/my-gyms' icon='exercise'/>
      <NavigationLink title='Send a Suggestion' route='/suggestion' icon='lightbulb'/>
      <NavigationLink title='Settings' route='/settings' icon='settings'/>
      <UserPlate/>
    </div>
  )
}

export default NavBar