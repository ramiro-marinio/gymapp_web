import React from 'react'
import PropTypes from 'prop-types'
import styles from './gymtile.module.css';
import CirleAvatar from '../../../general/circleavatar';
import noImageGym from '../../../../assets/no_image_gym.jpg';
import IconButton from '../../../icons/iconbutton';
import buttonStyles from '../../../general/button.module.css';
import { Icon } from '../../../icons/icon';
import { useNavigate } from 'react-router-dom';
function GymTile(props) {
  const navigate = useNavigate();
  const gymData = props.gymData;
  return (
    <div className={styles.gymTile}>
        <CirleAvatar radius={40} image={gymData.photoURL ?? noImageGym}/>
        <h3 className='text-3xl font-semibold'>{gymData.name}</h3>
        <IconButton icon={'login'} onPressed={()=>{
            navigate(`/gym/${props.gymData.id}/info`);
        }}/>
        <div class="dropdown dropdown-end">
        <div tabIndex={0} role='button' className={`${buttonStyles.iconbutton} z-[1] btn btn-neutral btn-circle w-12`} ><Icon name={'more_vert'}/></div>
        <ul tabIndex={0} class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a>View Gym Ratings</a></li>
            <li><a>Leave Gym</a></li>
        </ul>
        </div>
    </div>
  )
}

GymTile.propTypes = {
    gymData:PropTypes.any
}

export default GymTile
