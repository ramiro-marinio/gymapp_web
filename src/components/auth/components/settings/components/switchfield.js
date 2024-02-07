import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './switchfield.module.css';
function SwitchField(props) {
  const [val,setVal] = useState(props.defaultValue);
  return (
    <div style={{margin:10}}>
        <div className={styles.switchField}>
            <h2 style={{margin:0}}>{props.title}</h2>
            <div className={styles.line}>
                <input type='radio' id='A' checked={!val} onChange={(e)=>{setVal(false)}} name='val' onClick={(_)=>{props.setValue(false)}}/>
                <p className={styles.nomargin}>{props.valueA}</p>
            </div>
            <div className={styles.line}>
                <input type='radio' id='B' checked={val} onChange={(e)=>{setVal(true)}} name='val' onClick={(_)=>{props.setValue(true)}}/>
                <p className={styles.nomargin}>{props.valueB}</p>
            </div>
        </div>
    </div>
  )
}

SwitchField.propTypes = {
    defaultValue:PropTypes.bool,
    setValue:PropTypes.func,
    title:PropTypes.string,
    valueA:PropTypes.string,
    valueB:PropTypes.string,
    values:PropTypes.arrayOf(PropTypes.string)
}

export default SwitchField
