import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Route, useParams,Routes } from 'react-router-dom'
import { GymData } from '../../models/gymdata';
import CirleAvatar from '../../../../general/circleavatar';
import noImage from '../../../../../assets/no_image_gym.jpg'
import TabbarLink from './components/tabbarlink';
import GymInfo from './pages/info';
import ExerciseDemonstrations from './pages/exercisedemonstrations/exercisedemonstrations';
import Chats from './pages/chats';
import { getGymById } from './functions/getgymbyid';
import { FirebaseContext } from '../../../../../firebase/context';
import DialogProvider, { DialogContext } from '../../../../general/dialog/dialogcontext';
import Loading from '../../../../general/loading';
import DemonstrationDetails from './pages/exercisedemonstrations/demonstrationdetails';
import AddDemonstration from './pages/exercisedemonstrations/adddemonstration';
function GymMenu(props){
  const context = useContext(FirebaseContext);
  const dialogContext = useContext(DialogContext);
  const params = useParams();
  let gymJson = getGymById(params.gym,context.gyms)
  if(!gymJson){
    return <Loading/>
  }
  const gym = GymData.fromJson(gymJson);
  return (
    <div>
        	<div className='font-bold navbar flex-row h-8 w-full bg-neutral'>
            <div>
              <CirleAvatar className='ml-2 mr-2' radius={16} image={gym.photoURL ?? noImage}/>
              {gym.name}
            </div>
          </div>
          <div className='font-bold flex flex-row justify-evenly w-full bg-neutral'>
            <TabbarLink to={'info'} title='Info'/>
            <TabbarLink to={'chats'} title='Chat'/>
            <TabbarLink to={'exercise-demonstrations'} title='Exercise Demonstrations'/>
          </div>
          <div className='flex flex-col'>
            <DialogProvider>
            <Routes>
              <Route path='info' /*loader={({params})=>{return params}}*/ element={<GymInfo gymData={gym}/>}/>
              <Route path='chats' /*loader={({params})=>{return params}}*/ element={<Chats/>}/>
              <Route path='exercise-demonstrations' element={<ExerciseDemonstrations gymData={gym} dialogContext={dialogContext}/>}/>
              <Route path='exercise-demonstrations/add' element={<AddDemonstration gymData={gym} dialogContext={dialogContext}/>}/>
              <Route path='exercise-demonstrations/edit/:demoId' element={<AddDemonstration gymData={gym} dialogContext={dialogContext}/>}/>
              <Route index path='exercise-demonstrations/demonstration/:demoId' element={<DemonstrationDetails/>}/>
            </Routes>
            </DialogProvider>
          </div>
    </div>
  )
}

GymMenu.propTypes = {
    gymData:PropTypes.any,
}

export default GymMenu
