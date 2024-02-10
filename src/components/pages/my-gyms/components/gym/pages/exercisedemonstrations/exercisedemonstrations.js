import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../../../../firebase/initialize_firebase';
import Demonstration from './demonstration';
import Loading from '../../../../../../general/loading';
import { DemonstrationData } from './models/demonstrationdata';
import { useNavigate} from 'react-router-dom';
import FloatingActionButton from '../../../../../../general/fab/floatingactionbutton';
function ExerciseDemonstrations(props) {
  const [data,setData] = useState(undefined);
  const gymData = props.gymData;
  const dialogContext = props.dialogContext;
  const navigate = useNavigate();
  useEffect(()=>{
    const q = query(collection(db,'demonstrations'),where('gymId','==',gymData.id));
    let unsub = onSnapshot(q,(documentSnapshot)=>{
      setData(
        documentSnapshot.docs.map((doc)=>{
          return DemonstrationData.fromJson(doc.data())
        })
      );
    });
    
    //Will execute when the component is destroyed
    return ()=>{
      unsub();
      unsub = undefined;
    }
  },[setData,gymData.id])
  if(!data || !gymData){
    return <Loading/>
  }
  return (
    <div>
      <div className='flex flex-row justify-center items-center'>
        <h1 align='center' className='text-3xl m-4 font-bold'>
          Exercise Demonstrations
        </h1>
      </div>
      {
        data.map((demonstrationData)=>{
          return <Demonstration dialogContext={dialogContext} demonstrationData={demonstrationData}/>
        })
      }
    <FloatingActionButton  onPressed={()=>{
       navigate('add');
    }} icon={'add'}/>
    </div>
  )
}

ExerciseDemonstrations.propTypes = {
  gymData:PropTypes.any,
}

export default ExerciseDemonstrations
