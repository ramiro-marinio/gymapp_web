import React from 'react'
import styles from './overlay.module.css';
function Overlay({children}) {
  return (
    children != null ?
    <div className={styles.overlay}>
        {children}
    </div> : <></>
  )
}

export default Overlay