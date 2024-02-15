import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.css'
import { Icon } from '../icons/icon'
function Button(props) {
  const [mouseOver,setMouseOver] = useState(false);
  const red = props.red ?? 0;
  const green = props.green ?? 150;
  const blue = props.blue ?? 255;
  return (
    <div style={{
      color:props.enabled ? `rgb(${props.red},${props.green},${props.blue})` : 
      `rgb(${props.red/255*160},${props.green/255*160},${props.blue/255*160})`,

      backgroundColor:props.enabled ? !mouseOver ? `rgba(${red},${green},${blue},0.223)` : 
      `rgba(${red},${green},${blue},0.5)` : `rgba(${red},${green},${blue},0.1)`,
    }} 
    onMouseOver={()=>{setMouseOver(true)}} 
    onMouseOut={()=>{setMouseOver(false)}} 
    onMouseDown={()=>{setMouseOver(false)}}
    onMouseUp={()=>{setMouseOver(true)}}
    onClick={()=>{
      if(props.enabled){
        props.onClick();
      }
    }} className={props.enabled ? styles.button : styles.disabledButton}>{props.icon ? <Icon name={props.icon}/> : <></>}{props.title}</div>
  )
}

Button.propTypes = {
    onClick:PropTypes.func,
    icon:PropTypes.string,
    title:PropTypes.string,
    enabled:PropTypes.bool,
    red:PropTypes.number,
    green:PropTypes.number,
    blue:PropTypes.number
}

export default Button
