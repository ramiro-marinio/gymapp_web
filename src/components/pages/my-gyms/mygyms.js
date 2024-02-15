import React, { useContext } from 'react'
import styles from './mygyms.module.css';
import { FirebaseContext } from '../../../firebase/context';
import {DialogContext} from '../../general/dialog/dialogcontext';
import GymTile from './components/gymtile';
import FloatingActionButton from '../../general/fab/floatingactionbutton';
import IconButton from '../../icons/iconbutton';
import { useNavigate } from 'react-router-dom';
function MyGyms() {
  const navigate = useNavigate();
  const firebaseContext = useContext(FirebaseContext);
  const dialogContext = useContext(DialogContext);
  return (
    <div className={`${styles.mygyms} w-full h-full overflow-y-scroll`}>
      <div className='flex flex-row justify-center items-center'>
        <h1 className='text-3xl font-bold' align='center'>My Gyms</h1>
        <div className="dropdown dropdown-start dropdown-bottom">
          <ul tabIndex={0} className="dropdown-content bg-neutral relative z-[1] menu p-2 shadow rounded-box w-52">
              <li onClick={()=>{
                navigate('/join-gym')
              }}><a>Join a Gym</a></li>
              <li onClick={()=>{
                navigate('/create-gym')
              }}><a>Create a Gym</a></li>
            </ul>
            <div tabIndex={0} role="button">
              <IconButton icon={'add'} onPressed={()=>{}}/>
            </div>
        </div>
      </div>
      {
        firebaseContext.gyms?.length != 0 ? firebaseContext.gyms?.map(gym=>{
          return <GymTile firebaseContext={firebaseContext} dialogContext={dialogContext} gymData={gym}/>
        }) : <div className='flex flex-col w-full h-full justify-center items-center'>
          <h1 className='text-3xl font-bold m-4'>No gyms!</h1>
          <p>Try joining one or creating your own.</p>
        </div>
      }
    </div>
  )
}

export default MyGyms