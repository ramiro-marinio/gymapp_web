import React, { useContext, useState } from 'react'
import TextField from '../../../../../../auth/components/settings/components/textfield';
import GymPhotoPicker from './gymphotopicker';
import { useForm } from 'react-hook-form';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../../../../../../firebase/initialize_firebase';
import { generateRandomString } from '../../../../../../../functions/generaterandomstring';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { GymData } from '../../../../models/gymdata';
import { FirebaseContext } from '../../../../../../../firebase/context';
import { useNavigate } from 'react-router-dom';


function CreateGym() {
  const {register,handleSubmit} = useForm();
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState(undefined);
  const firebaseContext = useContext(FirebaseContext);
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit(async(data)=>{
      setLoading(true);
      const id = generateRandomString(28);
      let photoName;
      let photoURL;
      if(image){
        photoName = image.name;
        const reference = ref(storage,'/gym-profile-pics/' + photoName)
        const upload = await uploadBytes(reference,image);
        photoURL = await getDownloadURL(upload.ref);
      }
      setDoc(doc(db,'gyms',id),new GymData(id,data.title,data.description,firebaseContext.user.uid,photoName,photoURL).toJson())
      addDoc(collection(db,'memberships'),{
        accepted:true,
        admin:false,
        coach:false,
        gymId:id,
        userId:firebaseContext.user.uid,
      })
      setDoc(doc(db,'invites',id),{code:generateRandomString(7),gymId:id});
      navigate('/my-gyms');
    })}>
    <div className='w-full h-full overflow-y-scroll flex flex-col items-center'>
        <h1 align='center' className='text-3xl m-2 font-bold'>Create a Gym</h1>
        <div className='flex flex-col'>
          <label>Name</label>
          <input {...register('title')} type='text' className='input input-bordered w-80'/>
        </div>
        <TextField register={'description'} registerFunc={register} maxLength={5000} onChangeValue={()=>{}} maxLines={4} title={'Description'}/>
        <GymPhotoPicker onPick={(e)=>{
          setImage(e);
        }} registerFunc={register}/>
        <input type='submit' disabled={loading} className='btn btn-neutral' value={'Create'}/>
    </div>
  </form>
  )
}

export default CreateGym