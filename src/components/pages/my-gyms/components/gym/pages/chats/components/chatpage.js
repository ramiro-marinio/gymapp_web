import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../../../../../firebase/initialize_firebase';
import { FirebaseContext } from '../../../../../../../../firebase/context';
import { MessageData } from '../models/messagedata';
import Loading from '../../../../../../../general/loading';
import Message from './message';
import IconButton from '../../../../../../../icons/iconbutton';

function ChatPage(props) {
  const [myMessages,setMyMessages] = useState(undefined);
  const [theirMessages,setTheirMessages] = useState(undefined);
  let allMessages;
  if(myMessages && theirMessages){
    allMessages = myMessages.concat(theirMessages);
    allMessages.sort((a,b)=>{
      if(a.timestamp > b.timestamp){
        return 1;
      }
      else if(b.timestamp > a.timestamp){
        return -1;
      }
      return 0;
    });
  }
  const firebaseContext = useContext(FirebaseContext);
  useEffect(()=>{
    //const queryMyMessages = query(collection(db,'messages'))
    const unsubMM = onSnapshot(query(
      collection(db,'messages'),
      where('gymId','==',props.gymId),
      where('senderId','==',firebaseContext.user.uid),
      where('receiverId','==',props.userId),
    ),(querySnapshot)=>{
      setMyMessages(
        querySnapshot.docs.map((doc)=>{
          return MessageData.fromJson(doc.data());
        })
      );
    });
    let unsubTM = onSnapshot(query(
      collection(db,'messages'),
      where('gymId','==',props.gymId),
      where('senderId','==',props.userId),
      where('receiverId','==',firebaseContext.user.uid)
    ),(querySnapshot)=>{
      setTheirMessages(
        querySnapshot.docs.map((doc)=>{
          return MessageData.fromJson(doc.data());
        })
      );
    });
    if(!props.userId){
      unsubTM();
      setTheirMessages(undefined);
      unsubTM = onSnapshot(query(
        collection(db,'messages'),
        where('gymId','==',props.gymId),
        where('senderId','!=',firebaseContext.user.uid),
        where('receiverId','==',null)
      ),(querySnapshot)=>{
        setTheirMessages(
          querySnapshot.docs.map((doc)=>{
            return MessageData.fromJson(doc.data());
          })
        );
      });
    }
    return ()=>{
      unsubMM();
      unsubTM();
    }
  },[firebaseContext.user.uid,props.gymId,props.userId])
  if(!theirMessages){
    return(
      <Loading/>
    )
  }
  const sendMessage = ()=>{
    addDoc(collection(db,'messages'),new MessageData(
      props.gymId,
      firebaseContext.user.uid,
      props.userId ?? null,
      document.getElementById('message-input').value,
      Date.now(),
    ).toJson()
  ).then((_)=>{
    document.getElementById('messagePanel').scrollTop = document.getElementById('messagePanel').scrollHeight
  })
    document.getElementById('message-input').value = '';
  }
  return (
    <div translate='no' className='flex flex-col h-full'>
      <div id='messagePanel' className='flex-grow overflow-y-scroll'>
        {allMessages.map((message)=>{
          return <Message users={props.users} message={message}/>
        })}
      </div>
      <div className='flex p-[6px] flex-row items-center justify-between'>
        <input id='message-input' onKeyDown={(e)=>{
          if(e.key === 'Enter'){
            sendMessage();
          }
        }} className='input input-bordered flex-grow mr-[3px]'/>
        <IconButton enabled icon={'send'} onPressed={()=>{
          sendMessage();
        }}/>
      </div>
    </div>
  )
}

ChatPage.propTypes = {
     gymId:PropTypes.string,
     users:PropTypes.array,
     userId:PropTypes.string,
}

export default ChatPage
