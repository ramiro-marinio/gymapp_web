import React from 'react'
import PropTypes from 'prop-types'
import styles from './textfield.module.css';
function TextField(props) {
  return (
    <div className={styles.textFieldDiv}>
        <label>{props.title}</label>
        {props.maxLines < 2 ? <input type='text' value={props.initialValue} onChange={(e)=>{props.onChangeValue(e.target.value)}} className={styles.singleLine} maxLength={props.maxLength}/> : <textarea onChange={(e)=>{props.onChangeValue(e.target.value)}} className={styles.multiLine}>{props.initialValue}</textarea>}
    </div>
  )
}

TextField.propTypes = {
    title:PropTypes.string,
    initialValue:PropTypes.string,
    onChangeValue:PropTypes.func,
    maxLength:PropTypes.number,
    maxLines:PropTypes.number,
}

export default TextField
