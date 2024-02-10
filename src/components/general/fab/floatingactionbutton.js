import React from 'react'
import PropTypes from 'prop-types'
import styles from './floatingactionbutton.module.css';
import { Icon } from '../../icons/icon'

function FloatingActionButton(props) {
  let loading = props.loading ?? false;
  return (
    <div>
        <div className={styles.fabWrapper}>
            <div onClick={loading === false ? props.onPressed : null} className={loading === false ? styles.floatingactionbutton : styles.disabledFab}>
                <Icon name={props.icon}/>
            </div>
        </div>
    </div>
  )
}

FloatingActionButton.propTypes = {
    icon:PropTypes.string,
    color:PropTypes.array,
    onPressed:PropTypes.func,
    loading:PropTypes.bool,
}

export default FloatingActionButton
