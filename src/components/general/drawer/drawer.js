import React from 'react'
import NavigationLink from '../../navigation/navlink'
function Drawer() {
  return (
    <div class="drawer fixed z-10">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"/>
    {/* <div class="drawer-content flex flex-col items-center justify-center">
        <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    </div>  */}
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    <h3 align='center' className='text-4xl text-white pb-2'>TrainGuru</h3>
                <NavigationLink title='Home Page' route='/' icon='home'/>
                <NavigationLink title='My Gyms' route='/my-gyms' icon='exercise'/>
                <NavigationLink title='Send a Suggestion' route='/suggestion' icon='lightbulb'/>
                <NavigationLink title='Settings' route='/settings' icon='settings'/>
            </ul>
        
        </div>
    </div>
  )
}

export default Drawer