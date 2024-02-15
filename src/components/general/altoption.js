import React from 'react';
import styles from './altoption.module.css';
import googleImage from '../../assets/google.webp';
function GoogleOption(props) {
  return (
        <div className={`flex flex-row items-center justify-between pt-6 pb-6 pr-3 pl-3 ${styles.altOption}`} onMouseUp={props.onClick}>
          <div className='p-1'>
            <img className={`${styles.icon}`} src={googleImage} width={22}/>
          </div>
          <p className='flex-grow'>Continue with Google</p>
        </div>
  );
}

export default GoogleOption;