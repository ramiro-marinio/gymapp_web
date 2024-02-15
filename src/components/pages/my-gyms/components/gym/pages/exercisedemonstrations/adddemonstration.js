import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import VideoPicker from './videopicker'
import FloatingActionButton from '../../../../../../general/fab/floatingactionbutton'
import WorkAreasField from '../workareasfield'
import {DemonstrationData} from './models/demonstrationdata';
import { generateRandomString } from '../../../../../../../functions/generaterandomstring'
import { db, storage } from '../../../../../../../firebase/initialize_firebase'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../../../../general/loading'
function AddDemonstration(props) {
  const dialogContext = props.dialogContext;
  const params = useParams();
  console.log(JSON.stringify(params));
  const [loading,setLoading] = useState(null);
  const navigate = useNavigate();
  const [loadingFab,setLoadingFab] = useState(false);
  const [exerciseName,setExerciseName] = useState('');
  const [description,setDescription] = useState('');
  const [advice,setAdvice] = useState('');
  const [unit,setUnit] = useState(true);
  const [workAreas,setWorkAreas] = useState([]);
  const [video,setVideo] = useState(undefined);
  const [demoData,setDemodata] = useState(null);
  useEffect(()=>{
    if(params?.demoId){
        setLoading(true);
        getDoc(doc(db,'demonstrations',params.demoId)).then((documentSnapshot)=>{
            console.log(documentSnapshot.data());
            if(documentSnapshot?.data()){
                const data = DemonstrationData.fromJson(documentSnapshot.data())
                setDemodata(data);
                setExerciseName(data.exerciseName);
                setDescription(data.description);
                setAdvice(data.advice);
                setUnit(data.repUnit)
                setWorkAreas(data.workAreas);
                setVideo(data.resourceURL);
            }
            setLoading(false)
        })
      }
  },[params?.demoId,setLoading]);
  if(loading===true){
    return <Loading/>
  }
  return (
    <div className='h-full overflow-y-scroll'>
        <div className='flex flex-col items-center '>
            <h1 className='text-2xl mt-3 font-bold'>Add Demonstration</h1>
            <input type="text" defaultValue={exerciseName} onChange={(event)=>{setExerciseName(event.target.value)}} placeholder="Title" className="input input-bordered w-full max-w-xs" />
            <textarea defaultValue={description} onChange={(event)=>{setDescription(event.target.value)}} placeholder="Description" className="textarea mt-3 textarea-bordered w-96 h-24 max-w-xs" ></textarea>
            <textarea defaultValue={advice} onChange={(event)=>{setAdvice(event.target.value)}} placeholder="General Advice and Recommendations" className="textarea mt-3 textarea-bordered w-96 h-24 max-w-xs" ></textarea>
            
            <h1 className='mt-3 text-xl font-bold'>Exercise Unit</h1>
            <div className='flex flex-row items-center justify-center'>
                <p>Time</p><input checked={unit}  type="checkbox" onChange={(event)=>{
                    setUnit(!unit);
                }} className=" ml-2 mr-2 toggle"/><p>Reps</p>
            </div>
            <WorkAreasField defaultValue={workAreas} onChangeWorkAreas={(value)=>{
                setWorkAreas(value);
            }}/>
            <VideoPicker dialogContext={dialogContext} defaultValue={video} onPickVideo={(value)=>{
                setVideo(value);
            }}/>
            <FloatingActionButton loading={loadingFab} onPressed={async()=>{
                setLoadingFab(true);
                const id = params?.demoId ?? generateRandomString(28);
                let downloadURL = null;
                let videoName = video?.name.split('.');
                if(video && typeof(video) !== 'string'){
                    const reference = ref(storage,'/demo-vids/' + id);
                    const uploadResult = await uploadBytes(reference,video);
                    downloadURL = await getDownloadURL(uploadResult.ref);
                }
                else if(typeof(video) === 'string'){
                    downloadURL = video;
                }
                if(!video && demoData.resourceName){
                    deleteObject(ref(storage,'/demo-vids/' + id)).then(()=>{
                        videoName = null;
                        downloadURL = null;
                    })
                }
                await setDoc(
                    doc(db,'demonstrations',id),
                    new DemonstrationData(
                            props.gymData.id,
                            id,
                            exerciseName,
                            description,
                            unit,
                            workAreas,
                            advice,
                            typeof(video)==='string' ? demoData?.resourceName : (videoName ? `${id}.${videoName[videoName?.length-1]}` : null),
                            downloadURL,
                    ).toJson(),
                )
                navigate('../exercise-demonstrations')
            }
            } icon='check'/>
        </div>
    </div>
  )
}

AddDemonstration.propTypes = {
    gymData:PropTypes.any
}

export default AddDemonstration
