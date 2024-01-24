import React from 'react'
import styles from './navbar.module.css';
import NavigationLink from './navlink';
function NavBar() {
  return (
    <div className={styles.navbar}>
      <NavigationLink title='Home Page' route='/'/>
      <NavigationLink title='My Gyms' route='/my-gyms'/>
      <NavigationLink title='Send a Suggestion' route='/suggestion'/>
      <NavigationLink title='Settings' route='/settings'/>
    </div>
  )
}

export default NavBar