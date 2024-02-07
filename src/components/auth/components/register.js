import React from 'react';
import {auth,db} from '../../../firebase/initialize_firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from './auth.module.css';
import GoogleOption from '../../general/altoption';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import ErrorText from '../../general/errortext';
import { Link } from 'react-router-dom';
function Register() {
  const {register,control,handleSubmit,formState} = useForm();
  let password = '';
  const navigate = useNavigate();
  return (
    <div>
        <h2 align='center'>Sign Up</h2>
        <form onSubmit={handleSubmit(async(data)=>{
            var err = false;
            await createUserWithEmailAndPassword(auth,data['email'],data['password']).catch((error)=>{
                err = true;
                if(error.code === 'auth/email-already-in-use'){
                    alert('This email is already in use.');
                }
            }).then(async(userCredential)=>{
                if(!err){
                    navigate('/');
                }
            });
            
        })} noValidate>
            <div className={styles.credentials}>

                <input {...register('email',{validate:(value)=>{
                    if(!(/\S+@\S+\.\S+/.test(value))){
                        return 'Invalid Email.';
                    }
                    return true;
                }})} type='text' placeholder='Email' className={styles.field}/>

                <ErrorText>{formState.errors.email?.message}</ErrorText>

                <input {...register('password',{validate:(value)=>{
                    if(value.length < 8){
                        return 'Password must be at least 8 characters long.'
                    }
                    return true;
                }})} type='password' placeholder='Password' className={styles.field}/>

                <ErrorText>{formState.errors.password?.message}</ErrorText>

                <input {...register('confirmPassword',{validate:(value)=>{
                    if(value !== control._formValues.password){
                        return 'The password does not match.'
                    }
                    return true;
                }})} type='password' placeholder='Confirm Password' className={styles.field}/>

                <ErrorText>{formState.errors.confirmPassword?.message}</ErrorText>

                <input type='submit' value='Sign Up' className={styles.submit}/>
                <Link to={'/log-in'}>Already have an account? Log in</Link>
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
        </form>
    </div>
  )
}

export default Register