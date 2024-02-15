import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styles from './pickbutton.module.css';
import { Icon } from '../../../../icons/icon';
import { FirebaseContext } from '../../../../../firebase/context';
function PickButton(props) {
  const context = useContext(FirebaseContext);
  return (
    <div>
        <input {...props.register ? props.registerFunc(props.register) : null} type='file' id='file' onChange={props.onSelect} accept='image/*' />
        <label className={styles.fileLabel} htmlFor='file'>
            <Icon name='add_a_photo'/>
            <p className={styles.label}>Pick an Image</p>
        </label>
    </div>
  )
}

PickButton.propTypes = {
    onSelect:PropTypes.func
}

export default PickButton
