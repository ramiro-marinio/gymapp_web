import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import noImage from '../../../../../../../../assets/no_image.jpg';
import { FirebaseContext } from '../../../../../../../../firebase/context';

function findUser(users,uid){
  for(var i=0;i<users.length;i++){
    if(users[i].userId === uid){
      return users[i];
    }
  }
}

function Message(props) {
  const firebaseContext = useContext(FirebaseContext);
  return (
    <>
      <div className={`chat ${firebaseContext.user.uid === props.message.senderId ? 'chat-end' : 'chat-start'} ml-2 mr-2`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={props.message.photoURL ?? noImage} />
          </div>
        </div>
        <div className="chat-header">
          {firebaseContext.user.uid !== props.message.senderId ? `${findUser(props.users,props.message.senderId)?.displayName ?? 'Error'} ` : null}
          <time className="text-xs opacity-50">{new Date(props.message.timestamp).toLocaleString()}</time>
        </div>
        <div className="chat-bubble">{props.message.message}</div>
      </div>
    </>
  )
}

Message.propTypes = {
    message:PropTypes.any,
    users:PropTypes.array,
}

export default Message
