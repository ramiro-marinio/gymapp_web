import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Dialog from '../../../general/dialog/dialog';
import Button from '../../../general/button';
import styles from './gymtile.module.css';
import CirleAvatar from '../../../general/circleavatar';
import noImageGym from '../../../../assets/no_image_gym.jpg';
import IconButton from '../../../icons/iconbutton';
import buttonStyles from '../../../general/button.module.css';
import { Icon } from '../../../icons/icon';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase/initialize_firebase';
function GymTile(props) {
  const navigate = useNavigate();
  const firebaseContext = props.firebaseContext;
  const dialogContext = props.dialogContext;
  const gymData = props.gymData;
  return (
    <div className={styles.gymTile}>
        <CirleAvatar radius={40} image={gymData.photoURL ?? noImageGym}/>
        <h3 className='text-3xl font-semibold'>{gymData.name}</h3>
        <IconButton icon={'login'} onPressed={()=>{
            navigate(`/gym/${props.gymData.id}/info`);
        }}/>
        <div class="dropdown dropdown-end">
        <div tabIndex={0} role='button' className={`${buttonStyles.iconbutton} z-[1] btn btn-neutral btn-circle w-12`} ><Icon name={'more_vert'}/></div>
        <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52">
            <li onClick={()=>{
              document.activeElement.blur();
            }}><a>View Gym Ratings</a></li>
            <li onClick={()=>{
              document.activeElement.blur();
              dialogContext.setDialog((
                <Dialog
                title={'Leave Gym?'}
                actions={<>
                  <Button title={'No'} blue={255} red={0} green={150} enabled onClick={()=>{
                    dialogContext.setDialog(null);
                  }}/>
                  <Button title={'Yes'} blue={255} red={0} green={150} enabled onClick={()=>{
                    getDocs(
                      query(
                        collection(db,'memberships'),
                        where('gymId','==',props.gymData.id),
                        where('userId','==',firebaseContext.user.uid)
                      )
                    ).then(querySnapshot=>{
                      const doc = querySnapshot.docs[0];
                      deleteDoc(doc.ref)
                    })
                    dialogContext.setDialog(null);
                  }}/>
                </>}/>
              ))
            }}><a>Leave Gym</a></li>
        </ul>
        </div>
    </div>
  )
}

GymTile.propTypes = {
    gymData:PropTypes.any,
    firebaseContext:PropTypes.any,
    dialogContext:PropTypes.any,
}

export default GymTile
