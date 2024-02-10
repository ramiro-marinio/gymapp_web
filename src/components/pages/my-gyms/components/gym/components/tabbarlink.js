import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import styles from './tabbarlink.module.css';
function TabbarLink(props) {
  const navigate = useNavigate();
  return (
        <div onClick={()=>{
            navigate(props.to);
        }} className='bg-neutral flex flex-row justify-center items-center flex-grow m-0 rounded-none select-none flex-1 hover:cursor-pointer hover:brightness-75 active:brightness-125'>
            <p align='center' className='text-l l:text-sm'>{props.title}</p>
        </div>
  )
}

TabbarLink.propTypes = {
    to:PropTypes.string
}

export default TabbarLink
