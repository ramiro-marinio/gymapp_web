import React, { useContext } from 'react'
import styles from './userplate.module.css';
import CirleAvatar from '../../../general/circleavatar';
import noProfilePic from '../../../../assets/no_image.jpg';
import { auth } from '../../../../firebase/initialize_firebase';
import { useNavigate } from 'react-router-dom';
import {FirebaseContext} from '../../../../firebase/context';
import { signOut } from 'firebase/auth';
import { UserData } from '../../models/userdata';
function UserPlate() {
  const navigate = useNavigate();
  const firebaseContext = useContext(FirebaseContext);
  return (
    <div onMouseUp={
      ()=>{
        if(!firebaseContext.user){
          navigate('/log-in')
        }
        else{
          navigate('/profile-config')
        }
      }
    } className={styles.userplate}>
        <CirleAvatar radius={20} image={firebaseContext.userData?.photoURL ?? noProfilePic}/>
        <div style={{display:'flex',flexDirection:'column'}}>
          <span className={styles.title}>{firebaseContext.user ? 'Your Account' : 'No account'}</span>
          <span className={styles.textdetails}>{firebaseContext.user?.email ?? 'Tap to Log In (or register)'}</span>
        </div>
    </div>
  )
}

export default UserPlate