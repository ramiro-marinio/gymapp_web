import React, { useContext } from 'react'
import IconButton from '../../../../../icons/iconbutton'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../../../../../firebase/initialize_firebase'
import { DialogContext } from '../../../../../general/dialog/dialogcontext'
import Dialog from '../../../../../general/dialog/dialog'
import Button from '../../../../../general/button'
import { GymData } from '../../../models/gymdata'
import CirleAvatar from '../../../../../general/circleavatar'
import noImageGym from '../../../../../../assets/no_image_gym.jpg';
import { FirebaseContext } from '../../../../../../firebase/context'
import { useNavigate } from 'react-router-dom'
function JoinGym() {
  const navigate = useNavigate();
  const dialogContext = useContext(DialogContext);
  const firebaseContext = useContext(FirebaseContext);
  return (
    <div className='w-full h-full overflow-y-scroll flex flex-col items-center'>
        <h1 className='text-4xl font-bold m-4' align='center'>Join a Gym</h1>

        <p className='text-xl'>Invite Code</p>
        <div className='flex flex-row items-center'>
         <input id='codeInput' type='text' autoCorrect='no'  className='input input-bordered w-80'/>
         <div className='pl-2'>
            <IconButton enabled={true} icon={'check'} onPressed={()=>{
                const q = query(
                    collection(db,'invites'),
                    where('code','==',document.getElementById('codeInput').value)
                )
                getDocs(q).then((querySnapshot)=>{
                    if(querySnapshot.docs.length > 0){
                        getDoc(
                            doc(db,'gyms',querySnapshot.docs[0].data().gymId)
                        ).then((queryDocumentSnapshot)=>{
                            const gymData = GymData.fromJson(queryDocumentSnapshot.data());
                            dialogContext.setDialog(
                                <Dialog
                                title='Is this the correct gym?'
                                body={<div className='flex flex-col items-center p-1'>
                                    <h1 align='center' className='text-2xl font-bold m-2'>{gymData.name}</h1>
                                    <CirleAvatar radius={60} image={gymData.photoURL ?? noImageGym}/>
                                </div>}
                                actions={
                                    <>
                                      <Button red={0} green={150} blue={255} enabled title={'No'} onClick={()=>{
                                        dialogContext.setDialog(null);
                                      }}/>
                                      <Button red={0} green={150} blue={255} enabled title={'Yes'} onClick={()=>{
                                        for(let i=0;i<firebaseContext.gyms.length;i++){
                                            if(firebaseContext.gyms[i].id == gymData.id){
                                                dialogContext.setDialog(
                                                    <Dialog
                                                    title={'You have already joined this gym!'}
                                                    actions={<Button title={'Ok'} enabled onClick={()=>{dialogContext.setDialog(null)}}/>}
                                                    />
                                                )
                                                return;
                                            }
                                        }
                                        addDoc(collection(db,'memberships'),{
                                            'gymId':gymData.id,
                                            'userId':firebaseContext.user.uid,
                                        }).then((_)=>{
                                            navigate('/my-gyms')
                                        })
                                        dialogContext.setDialog(null);
                                      }}/>
                                    </>
                                }
                                />
                            )
                        })
                    }
                    else{
                        dialogContext.setDialog(
                            <Dialog
                            title='The gym with the specified invite code was not found.'
                            actions={<Button onClick={()=>{dialogContext.setDialog(null)}} enabled red={0} green={150} blue={255} title={'Ok'}/>}
                            />
                        )
                    }
                })
            }}/>
         </div>
        </div>
    </div>
  )
}

export default JoinGym