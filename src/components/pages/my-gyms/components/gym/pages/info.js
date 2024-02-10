import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import noImageGym from '../../../../../../assets/no_image_gym.jpg';
import CirleAvatar from '../../../../../general/circleavatar';
import {getDoc,doc} from "firebase/firestore";
import {db} from "../../../../../../firebase/initialize_firebase";
import {UserData} from '../../../../../auth/models/userdata';
import Loading from '../../../../../general/loading';
function GymInfo(props) {
  const gymData = props.gymData;
  const [userData,setUserData] = useState(undefined);
  useEffect(()=>{
    getDoc(doc(db,'userData',gymData.ownerId)).then((doc)=>{
      setUserData(UserData.fromJson(doc.data()));
    });
  },[gymData.ownerId]);
  if(!userData){
    return <Loading/>
  }
  return (
    <div className='flex flex-col items-center'>
      <h1 align='center' className='text-5xl font-bold m-4'>{gymData.name}</h1>
      <CirleAvatar radius={65} image={gymData.photoURL ?? noImageGym}/>
      <p>{gymData.description}</p>
      <p>Owner: {userData.displayName}</p>
    </div>
  )
}

GymInfo.propTypes = {
  gymData:PropTypes.any
}

export default GymInfo