import React from 'react';
import {auth,db} from '../../../firebase/initialize_firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import GoogleOption from './altoption';
function Register() {
  return (
    <div>
        <h2 align='center'>Register</h2>
        <div className={styles.credentials}>
            <input type='text' placeholder='User Name' className={styles.field}/>
            <input type='password' placeholder='Password' className={styles.field}/>
            <input type='password' placeholder='Confirm Password' className={styles.field}/>
            <input type='button' value='Register' className={styles.submit}/>
        </div>
        <h2 align='center'>Or...</h2>
        <GoogleOption onClick={async()=>{
            try{
                await signInWithPopup(auth,new GoogleAuthProvider());
            }
            catch (e){
                console.log(e);
            }
        }}/>
    </div>
  )
}

export default Register