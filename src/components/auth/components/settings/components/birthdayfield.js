import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './birthdayfield.module.css';
function BirthdayField(props) {
  const [date,setDate] = useState(props.initialValue);
  return (
    <div className={styles.birthdayField}>
        <h3 className={styles.noMargin}>Birthday</h3>
        <input type='date' value={date} onChange={(e)=>{
            setDate(e.target.value);
            props.onChangeDate(e.target.valueAsDate.getMilliseconds())
        }}/>
    </div>
    
  )
}

BirthdayField.propTypes = {
    initialValue:PropTypes.string,
    onChangeDate:PropTypes.func
}

export default BirthdayField
