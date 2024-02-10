import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import ReactPlayer from 'react-player'
import Dialog from '../../../../../../general/dialog/dialog';
import DialogContext from '../../../../../../general/dialog/dialogcontext';
import IconButton from '../../../../../../icons/iconbutton';
import styles from './videopicker.module.css';
import { Icon } from '../../../../../../icons/icon';
import Button from '../../../../../../general/button';
function VideoPicker(props) {
  const dialogContext = props.dialogContext;
  const [video,setVideo] = useState(undefined);
  const onPickVideo = props.onPickVideo;
  return (
    <div className='pt-3'>
        <h1 align='center' className='font-bold text-xl'>Pick a Video</h1>
        {video ? <h1>{video.name}</h1> : props.defaultValue ? <ReactPlayer controls url={props.defaultValue}/> : <h1 className='text-error text-xl font-bold'>No video has been picked!</h1>}
        <div className='flex flex-row  justify-center items-center'>
            <IconButton icon='delete' onPressed={()=>{
                dialogContext.setDialog(<Dialog title={'Remove Video?'} actions={
                    <>
                        <Button enabled title='No' red={0} green={150} blue={255} onClick={()=>{
                            dialogContext.setDialog(null);
                        }}/>
                        <Button enabled title='Yes' red={0} green={150} blue={255} onClick={()=>{
                            dialogContext.setDialog(null);
                            setVideo(null);
                            onPickVideo(null);
                        }}/>
                    </>
                }/>);
            }}/>
            <input type='file' className={styles.fileInput} accept='video/*' id='file' onChange={(event)=>{
                if(event.target.files.length == 0 || !event.target.files){
                    return;
                }
                setVideo(event.target.files[0]);
                onPickVideo(event.target.files[0]);
            }}/>
            <label for='file'>
                <div className='flex text-white justify-evenly items-center rounded-md flex-row w-36 h-12 bg-primary hover:brightness-90
                hover:cursor-pointer active:brightness-105'>
                    <Icon name={'videocam'}/>
                    <h1 className='text-lg font-bold'>Pick a Video</h1>
                </div>
            </label>
        </div>
    </div>
  )
}

VideoPicker.propTypes = {
    defaultValue:PropTypes.string,
    onPickVideo:PropTypes.func
}

export default VideoPicker
