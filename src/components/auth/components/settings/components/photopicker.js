import React, { useContext, useRef } from 'react'
import CirleAvatar from '../../../../general/circleavatar';
import IconButton from '../../../../icons/iconbutton';
import noImage from '../../../../../assets/no_image.jpg';
import styles from './photopicker.module.css';
import PickButton from './pickbutton';
import { FirebaseContext } from '../../../../../firebase/context';
import { uploadBytes,getDownloadURL,ref,deleteObject } from 'firebase/storage';
import { storage } from '../../../../../firebase/initialize_firebase';
import { updateProfile } from 'firebase/auth';
import { DialogContext } from '../../../../general/dialog/dialogcontext';
import Dialog from '../../../../general/dialog/dialog';
import Button from '../../../../general/button';
export default function PhotoPicker() {
  const imageRef = useRef();
  const context = useContext(FirebaseContext);
  const dialogContext = useContext(DialogContext);
  return (
    <div className={styles.photoPicker}>
        <CirleAvatar radius={60} image={context.userData?.photoURL ?? noImage}/>
        <div  className={styles.options}>
            <IconButton enabled={!!context.userData.photoURL} icon='delete' onPressed={()=>{
              dialogContext.setDialog(
                <Dialog
                title={'Delete Profile Picture?'}
                actions={<>
                    <Button enabled title={'No'} blue={255} red={100} green={100} onClick={()=>{dialogContext.setDialog(null)}}/>
                    <Button enabled title={'Yes'} blue={255} red={100} green={100} onClick={()=>{
                      dialogContext.setDialog(null);
                      const reference = ref(storage,'/profile-pics/' + context.user.uid);
                      try{
                        deleteObject(reference)
                      }
                      catch{
                      }
                      updateProfile(context.user,{photoURL:undefined});
                      context.setUserData({photoURL:null}).then(()=>{
                          dialogContext.setDialog(
                          <Dialog title={'Successfully Removed Profile Picture.'} actions={<Button title={'Ok'} blue={255} red={100} green={100} enabled onClick={()=>{dialogContext.setDialog(null)}}/>}/>
                        );
                      });
                    }}/>
                </>}
                />
              )
            }}/>
            <PickButton onSelect={(e)=>{
            if(!e.target.files){
              return;
            }
            const reference = ref(storage,'/profile-pics/' + context.user.uid);
            console.log('shit nut cum jizz');
            uploadBytes(reference,e.target.files[0]).then((uploadResult)=>{
              getDownloadURL(uploadResult.ref).then((value)=>{
                context.setUserData({photoURL:value});
                updateProfile(context.user,{photoURL:value}).then((_)=>{
                  dialogContext.setDialog(
                    <Dialog title={'Successfully Changed Profile Picture.'} actions={<Button title={'Ok'} blue={255} red={100} green={100} enabled onClick={()=>{dialogContext.setDialog(null)}}/>}/>
                  );
                })
              })
            })
          }}/>
        </div>
    </div>
  )
}
