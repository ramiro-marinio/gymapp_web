import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

function GymMenu(props){
  const params = useParams();
  return (
    <div>
        {JSON.stringify(params)}
    </div>
  )
}

GymMenu.propTypes = {
    gymData:PropTypes.any,
}

export default GymMenu
