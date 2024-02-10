import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '../../../../../icons/iconbutton'
import { Icon } from '../../../../../icons/icon';

function WorkAreasField(props) {
  const [workAreas,setWorkAreas] = useState(props?.defaultValue ?? []);
  return (
    <div className='m-3 font-bold w-full flex flex-col items-center'>
        <h1 align='center' className='text-2xl'>Work Areas</h1>
        <ul>
            {workAreas.map((workArea,index)=>{
                return <div className='flex flex-row items-center justify-center'>
                    <div className='w-[200px] justify-center items-center'>
                        <p>{workArea}</p>
                    </div>
                    <Icon onPressed={()=>{
                        let result = [];
                        workAreas.forEach((value,i)=>{
                            if(i !== index){
                                result.push(value);
                            }
                        })
                        props.onChangeWorkAreas(result);
                        setWorkAreas(result);
                    }} className='hover:bg-[rgba(158,158,158,0.2)] hover:cursor-pointer rounded-full active:bg-[rgba(158,158,158,0.1)]' name='close'/>
                </div>
            })}
        </ul>
        <div className='flex w-[400px] flex-row items-center justify-center'>
            <input id='workArea' type='text' placeholder='What does this exercise work?' className='input input-sm input-bordered flex-1'/>
            <IconButton icon='add' enabled onPressed={()=>{
                if(document.getElementById('workArea').value === '' || !document.getElementById('workArea').value){
                    return;
                }
                setWorkAreas(workAreas.concat([document.getElementById('workArea').value]))
                props.onChangeWorkAreas(workAreas.concat([document.getElementById('workArea').value]));
                document.getElementById('workArea').value = ''
            }}/>
        </div>
    </div>
  )
}

WorkAreasField.propTypes = {
    defaultValue:PropTypes.array,
    onChangeWorkAreas:PropTypes.func
}

export default WorkAreasField
