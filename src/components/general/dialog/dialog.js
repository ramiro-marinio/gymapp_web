import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './dialog.module.css';
import IconButton from '../../icons/iconbutton';
import { DialogContext } from './dialogcontext';
function Dialog(props) {
  const dialogContext = useContext(DialogContext);
  return (
    <div className={styles.dialog}>
        <div className={styles.title}>
          <h3>{props.title}</h3>
          <IconButton icon={'close'} onPressed={()=>{
            dialogContext.setDialog(null);
          }}/>
        </div>
        <p>{props.body}</p>
        <div className={styles.actions}>
            {props.actions}
        </div>
    </div>
  )
}

Dialog.propTypes = {
    title:PropTypes.string,
    body:PropTypes.string,
    actions:PropTypes.any,
}

export default Dialog
