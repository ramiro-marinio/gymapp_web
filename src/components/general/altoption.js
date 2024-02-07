import React from 'react';
import styles from './altoption.module.css';
import googleImage from '../../assets/google.webp';
function GoogleOption(props) {
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} onMouseUp={props.onClick}>
        <div className={styles.altOption}><img className={styles.icon} src={googleImage} width={22}/>Continue with Google</div>
    </div>
  );
}

export default GoogleOption;