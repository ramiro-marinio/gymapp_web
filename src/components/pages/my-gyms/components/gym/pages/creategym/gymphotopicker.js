import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PickButton from '../../../../../../auth/components/settings/components/pickbutton'
import IconButton from '../../../../../../icons/iconbutton'
import Button from '../../../../../../general/button'
import { useForm } from 'react-hook-form'

function GymPhotoPicker(props) {
  const [image,setImage] = useState(undefined);
  return (
    <div className='flex flex-col items-center'>
        <h1 className='text-xl font-bold' align='center'>Profile Picture</h1>
        <p className={`${image ? 'text-success' : 'text-error'}`} align='center'>{image?.name ?? 'No picture has been picked!'}</p>
        <div className='flex flex-row justify-center items-center'>
            <IconButton enabled icon={'delete'} onPressed={()=>{
                setImage(undefined);
            }}/>
            <PickButton register={'profilePicture'} registerFunc={props.registerFunc} onSelect={(image)=>{
                setImage(image.target.files[0]);
                props.onPick(image.target.files[0]);
            }}/>
        </div>
    </div>
  )
}

GymPhotoPicker.propTypes = {
    onPick:PropTypes.func,
    registerFunc:PropTypes.func
}

export default GymPhotoPicker
