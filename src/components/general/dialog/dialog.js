import React from 'react';
import PropTypes from 'prop-types';
import styles from './dialog.module.css';
function Dialog(props) {
  return (
    <>
        <div className={styles.title}>
          <h3>{props.title}</h3>
        </div>
        <p>{props.body}</p>
        <div className={styles.actions}>
            {props.actions}
        </div>
    </>
  )
}

Dialog.propTypes = {
    title:PropTypes.string,
    body:PropTypes.string,
    actions:PropTypes.any,
}

export default Dialog
