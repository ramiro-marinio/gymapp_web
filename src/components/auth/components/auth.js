import React from 'react';
import {auth,db} from '../../../firebase/initialize_firebase'
import styles from './auth.module.css';
import {useForm} from 'react-hook-form';
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleOption from './altoption';
function LogIn() {
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    return (
        <div>
            <h2 align='center'>Log In</h2>
            
                <form onSubmit={handleSubmit((data)=>{
                    signInWithEmailAndPassword(auth,data['userName'],data['password']).then(()=>{
                        navigate('/');
                    }).catch((e)=>{
                        alert(e.toString());
                    });
                })}>
                    <div className={styles.credentials}>
                        <input {...register('userName')} type='text' placeholder='User Name' className={styles.field}/>
                        <input {...register('password')} type='password' placeholder='Password' className={styles.field}/>
                        <input type='submit' value='Log In' className={styles.submit}/>
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
                </form>
        </div>
    );
}

export default LogIn;