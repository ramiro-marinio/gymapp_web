import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '../../../../../../../components/icons/iconbutton';
import Dialog from '../../../../../../general/dialog/dialog';
import Button from '../../../../../../general/button';
import { useNavigate } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../../../../../../firebase/initialize_firebase';
import { deleteObject, ref } from 'firebase/storage';
function Demonstration(props) {
  const navigate = useNavigate();
  const dialogContext = props.dialogContext;
  let demonstrationData = props.demonstrationData;
  //{JSON.stringify(demonstrationData.toJson())}
  return (

    <div className='flex flex-row justify-between items-center bg-neutral border-solid m-2 p-6 rounded-md'>
       <div className='flex-grow'>
          <h3 className='text-l line-clamp-1 break-all font-bold overflow-ellipsis'>{demonstrationData.exerciseName}</h3>
        </div>
        <IconButton icon={'remove_red_eye'} enabled onPressed={()=>{
            navigate(`demonstration/${demonstrationData.id}`)
        }}/>
        <IconButton icon={'edit'} enabled onPressed={()=>{
            navigate(`edit/${demonstrationData.id}`)
        }}/>
        <IconButton icon={'delete'} enabled onPressed={()=>{
          console.log(dialogContext);
            dialogContext.setDialog(
              <Dialog title={'Delete Demonstration?'} actions={
                <>
                <Button blue={255} red={100} green={150} enabled title='No' onClick={()=>{
                  dialogContext.setDialog(null);
                }}/>
                <Button blue={255} red={100} green={150} enabled title='Yes' onClick={()=>{
                  dialogContext.setDialog(null);
                  if(demonstrationData.resourceName){
                    deleteObject(ref(storage,'/demo-vids/'+demonstrationData.resourceName));
                  }
                  deleteDoc(doc(db,'demonstrations',demonstrationData.id))
                }}/>
                </>
              }/>
            )
        }}/>
    </div>
    
  )
}

Demonstration.propTypes = {
    demonstrationData:PropTypes.any,
}

export default Demonstration
