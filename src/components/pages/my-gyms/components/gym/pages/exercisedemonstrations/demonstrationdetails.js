import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { doc, getDoc} from 'firebase/firestore';
import { db } from '../../../../../../../firebase/initialize_firebase';
import { DemonstrationData } from './models/demonstrationdata';
import Loading from '../../../../../../general/loading';
import ReactPlayer from 'react-player';
import styles from './demonstrationdetails.module.css'
function DemonstrationDetails(props) {
  const params = useParams();
  const [data,setData] = useState(undefined);
  useEffect(()=>{
    getDoc((doc(db,'demonstrations',params.demoId))).then((documentSnapshot=>{
      setData(DemonstrationData.fromJson(documentSnapshot.data()));
    }));
  },[setData,params.demoId]);
  if(!data){
    return (
      <Loading/>
    )
  }
  return (
    <div className='flex flex-col p-2'>
      {data.resourceURL ? <div className={styles.playerWrapper}>
        <ReactPlayer width={400} height={400/16*9} className={styles.reactPlayer} url={data.resourceURL}  controls/>
      </div> : <></>}
      <h1 translate='no' className='text-2xl font-bold'>{data.exerciseName}</h1>
      <p translate='no' className='mt-3text-lg'>{data.desription === '' ? 'No Description' : data.description}</p>
      <h3 className='text-xl mt-5 font-bold'>Work Areas:</h3>
      
      {
        data.workAreas != [] ?
        <>
          <ul className='list-disc list-inside'>
            {data.workAreas.map((workArea)=>{
              return <li translate='no'>{workArea}</li>
            })}
          </ul>
        </> : <></>
      }

      {data.advice !== '' ? <><h3 className='text-xl font-semibold'>General Advice and Recommendations</h3>
      <p className='text-m'>{data.advice}</p></> : <></>}
    </div>
  )
}

DemonstrationDetails.propTypes = {
    demonstrationData:PropTypes.any
}

export default DemonstrationDetails
