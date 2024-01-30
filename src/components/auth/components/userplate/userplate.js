import React, { useContext } from 'react'
import styles from './userplate.module.css';
import CircleAvatar from './components/circleavatar';
import noProfilePic from '../../../../assets/no_image.jpg';
import { auth } from '../../../../firebase/initialize_firebase';
import { useNavigate } from 'react-router-dom';
import {FirebaseContext} from '../../../../firebase/context';
import { signOut } from 'firebase/auth';
function UserPlate() {
  const navigate = useNavigate();
  const firebaseContext = useContext(FirebaseContext);
  console.log(noProfilePic);
  return (
    <div onMouseUp={
      ()=>{
        if(!firebaseContext.user){
          navigate('/log-in')
        }
        else{
          signOut(auth);
        }
      }
    } className={styles.userplate}>
        <CircleAvatar radius={20} image={firebaseContext.user?.photoURL ?? noProfilePic}/>
        <div style={{display:'flex',flexDirection:'column'}}>
          <span className={styles.title}>{firebaseContext.user ? 'Your Account' : 'No account'}</span>
          <span className={styles.textdetails}>{firebaseContext.user?.email ?? 'Tap to Log In (or register)'}</span>
        </div>
    </div>
  )
}

export default UserPlate