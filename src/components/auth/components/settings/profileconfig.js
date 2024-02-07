import React, { useContext, useState } from 'react'
import styles from './profileconfig.module.css';
import PhotoPicker from './components/photopicker';
import TextField from './components/textfield';
import SwitchField from './components/switchfield';
import BodyField from './components/bodyfield';
import BirthdayField from './components/birthdayfield';
import Button from '../../../general/button';
import { FirebaseContext } from '../../../../firebase/context';
import { UserData } from '../../models/userdata';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../../firebase/initialize_firebase';
export function ProfileConfig() {
  const navigate = useNavigate();
  const context = useContext(FirebaseContext);
  const userData = context.userData;
  const [birthday,setBirthday] = useState(userData?.birthday);
  const [name,setName] = useState(userData?.displayName);
  const [info,setInfo] = useState(userData?.info);
  const [injuries,setInjuries] = useState(userData?.injuries);
  const [sex,setSex] = useState(userData?.sex);
  const [stature,setStature] = useState(userData?.stature);
  const [weight,setWeight] = useState(userData?.weight);
  if(!userData){
    return <div>No Account!</div>
  }
  const newUserData = new UserData(
    birthday,
    name,
    info,
    injuries,
    userData.photoURL,
    sex,
    userData.staff,
    stature,
    userData.userId,
    weight,
    );
  const changesMade = JSON.stringify(userData.toJson()) !== 
  JSON.stringify(newUserData.toJson());
  if(!userData){
    return <div style={{display:'flex',flexDirection:'column'}}>
      No Account!
    </div>
  }
  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",flexDirection:"row"}}>
      <div className={styles.profileConfig}>
        <h1>Profile Config</h1>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <Button red={0} green={255} blue={0} enabled={changesMade} icon={'save'} onClick={()=>{
            context.setUserData(newUserData.toJson());
           }} title={'Save'}/>
           <Button red={255} green={0} blue={0} enabled icon={'logout'} onClick={()=>{signOut(auth).then(()=>{navigate('/')})}} title={'Log Out'}/>
        </div>
        <PhotoPicker/>
        <TextField maxLength={40} maxLines={1} title='Display Name' initialValue={name} onChangeValue={(value)=>{setName(value)}}/>
        <TextField maxLength={5000} maxLines={6} title='Information' initialValue={info} onChangeValue={(value)=>{setInfo(value)}}/>
        <BodyField initialStature={stature} initialWeight={weight} onChangeStature={(stature)=>{setStature(stature)}} onChangeWeight={(weight)=>{setWeight(weight)}}/>
        <SwitchField title='Gender' valueA='Male' valueB='Female' defaultValue={sex} setValue={(value)=>{
          setSex(value);
        }}/>
        <BirthdayField initialValue={new Date(userData.birthday).toISOString().split('T')[0]} onChangeDate={(milliseconds)=>{
          setBirthday(milliseconds);
        }}/>
        <TextField maxLength={5000} maxLines={6} title='Injuries' onChangeValue={(value)=>{setInjuries(value)}}/>
      </div>
    </div>
  )
}