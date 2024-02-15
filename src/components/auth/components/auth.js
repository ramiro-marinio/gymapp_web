import React from 'react';
import {auth,db} from '../../../firebase/initialize_firebase'
import styles from './auth.module.css';
import {useForm} from 'react-hook-form';
import {signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from 'firebase/auth';
import { useNavigate,Link } from 'react-router-dom';
import GoogleOption from '../../general/altoption';
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
                        <input {...register('userName')} type='text' placeholder='User Name' className='input m-1 input-bordered'/>
                        <input {...register('password')} type='password' placeholder='Password' className='input m-1 input-bordered'/>
                        <input type='submit' className='btn btn-neutral' value='Log In'/>
                        <Link to={'/register'} className='text-blue-400'>Don't have an account? Sign Up</Link>
                        <h2 align='center' className='text-3xl m-5 font-bold'>Or...</h2>
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