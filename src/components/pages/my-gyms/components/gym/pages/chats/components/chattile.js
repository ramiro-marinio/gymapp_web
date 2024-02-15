import React from 'react'
import PropTypes from 'prop-types'
import CircleAvatar from '../../../../../../../general/circleavatar'
import noImage from '../../../../../../../../assets/no_image.jpg';
import IconButton from '../../../../../../../icons/iconbutton';
function ChatTile(props) {
  return (
    <div onClick={props.onSelect} className={`flex flex-row ${props.active ? 'bg-[rgba(220,220,220,0.4)]' : null} justify-center 
    ${!props.active ? 'hover:bg-[rgba(200,200,200,0.1)] active:bg-[rgba(220,220,220,0.3)]' : null} hover:cursor-pointer`}>
        <div className='flex flex-row p-3 h-full w-[100%] items-center justify-between'>
            <div className='flex flex-row text-white items-center'>
                <CircleAvatar radius={20} image={noImage}/>
                <h1 className='text-xl m-3 font-bold'>{props.userData.displayName}</h1>
            </div>
            <IconButton icon={'more_vert'} onPressed={()=>{

            }}/>
        </div>
    </div>
  )
}

ChatTile.propTypes = {
    userData:PropTypes.any,
    active:PropTypes.bool,
    onSelect:PropTypes.func,
}

export default ChatTile
