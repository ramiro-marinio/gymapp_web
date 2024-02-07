import React, { useContext } from 'react'
import styles from './mygyms.module.css';
import { FirebaseContext } from '../../../firebase/context';
import {DialogContext} from '../../general/dialog/dialogcontext';
import GymTile from './components/gymtile';
function MyGyms() {
  const firebaseContext = useContext(FirebaseContext);
  const dialogContext = useContext(DialogContext);
  return (
    <div className={styles.mygyms}>
      <h1 className='text-4xl mt-2 ml-4'>My Gyms</h1>
      {firebaseContext.gyms?.map(gym=>{
        return <GymTile gymData={gym}/>
      })}
    </div>
  )
}

export default MyGyms