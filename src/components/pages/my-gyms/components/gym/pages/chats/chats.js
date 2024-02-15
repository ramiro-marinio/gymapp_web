import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {query,doc,getDocs, collection, where, getDoc} from 'firebase/firestore';
import { db } from '../../../../../../../firebase/initialize_firebase';
import { UserData } from '../../../../../../auth/models/userdata';
import ChatTile from './components/chattile';
import Loading from '../../../../../../general/loading';
import ChatPage from './components/chatpage';
function Chats(props) {
  console.log('loaded')
  const firebaseContext = props.firebaseContext;
  const [users,setUsers] = useState(undefined);
  const [selected,setSelected] = useState(undefined);
  useEffect(()=>{
    const q = query(collection(db,'memberships'),where('gymId','==',props.gymData.id));
    getDocs(q).then((querySnapshot)=>{
      let result = [];
      querySnapshot.docs.forEach(async(document)=>{
        const data = document.data();
        if(!data){
          return;
        }
        if(data.userId!==firebaseContext.user?.uid){
          await getDoc(doc(db,'userData',data.userId)).then((queryDocumentSnapshot)=>{
            result.push(UserData.fromJson(queryDocumentSnapshot.data()));
            setUsers(result);
          })
        }
      })
    })
  },[setUsers,firebaseContext.user?.uid,props.gymData.id]);
  if(!users || !firebaseContext.user){
    return <Loading/>
  }
  return (
  <div className='flex flex-row h-full'>
      <div className='flex-[3.5] h-full overflow-y-scroll'>
        {users?.length > 0 ? users.map((userData)=>{
          return <ChatTile onSelect={()=>{setSelected(userData)}} active={userData.userId === selected?.userId} userData={userData}/>
        }) : <h1>No Users!</h1>}
      </div>
      <div className='flex-[6.5] '>
        {selected === undefined ? null : <ChatPage users={[selected]} gymId={props.gymData.id} userId={selected.userId}/>}
      </div>
    </div>
  )
}

Chats.propTypes = {
  firebaseContext:PropTypes.any,
  gymData:PropTypes.any,
}

export default Chats
