import React from 'react'
import PropTypes from 'prop-types'
import styles from './textfield.module.css';
function TextField(props) {
  return (
    <div className={styles.textFieldDiv}>
        <label>{props.title}</label>
        {props.maxLines < 2 ? <input { ...(props.register ? props.registerFunc(props.register) : null) } type='text' value={props.initialValue} onChange={(e)=>{props.onChangeValue(e.target.value)}} className='input input-bordered w-80' maxLength={props.maxLength}/> : <textarea { ...(props.register ? props.registerFunc(props.register) : null) } onChange={(e)=>{props.onChangeValue(e.target.value)}} defaultValue={props.initialValue} className='textarea textarea-bordered w-80'></textarea>}
    </div>
  )
}

TextField.propTypes = {
    register:PropTypes.string,
    registerFunc:PropTypes.func,
    title:PropTypes.string,
    initialValue:PropTypes.string,
    onChangeValue:PropTypes.func,
    maxLength:PropTypes.number,
    maxLines:PropTypes.number,
}

export default TextField
