import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './bodyfield.module.css';
function BodyField(props) {
    const [stature,setStature] = useState(props.initialStature);
    const [weight,setWeight] = useState(props.initialWeight);
    return (
        <div className={styles.bodyFieldDiv}>
            <div className={styles.singleline}>
                <p>Stature:</p>
                <input type='range' value={stature} max={230} min={100} onChange={(value)=>{props.onChangeStature(parseInt(value.target.value));setStature(value.target.value)}} className='ml-1 range range-xs w-80'/>
                <p>{stature} cm.</p>
            </div>
            <div className={styles.singleline}>
                <p>Weight:</p>
                <input type='range' value={weight} max={200} min={35} onChange={(value)=>{props.onChangeWeight(parseInt(value.target.value));setWeight(value.target.value)}} className='ml-1 range range-xs w-80'/>
                <p>{weight} kg.</p>
            </div>
        </div>
    )
}

BodyField.propTypes = {
    onChangeStature:PropTypes.func,
    onChangeWeight:PropTypes.func,
    initialStature:PropTypes.number,
    initialWeight:PropTypes.number,
}

export default BodyField


