import { Route, Routes} from "react-router-dom";
import NavBar from "./components/navigation/navbar";
import './globals.css';
import HomePage from "./components/pages/home/homepage";
import MyGyms from "./components/pages/my-gyms/mygyms";
import Suggestion from "./components/pages/suggestion";
import Settings from './components/pages/settings';
import LogIn from "./components/auth/components/auth";
import Register from "./components/auth/components/register";
import { useContext } from "react";
import { ProfileConfig } from "./components/auth/components/settings/profileconfig";
import Overlay from "./components/general/dialog/overlay";
import { DialogContext } from "./components/general/dialog/dialogcontext";
import Drawer from "./components/general/drawer/drawer";
import GymMenu from "./components/pages/my-gyms/components/gym/gymmenu";
import JoinGym from "./components/pages/my-gyms/components/gym/pages/joingym";
import CreateGym from "./components/pages/my-gyms/components/gym/pages/creategym/creategym";
function App() {
  const dialogContext = useContext(DialogContext);
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <Drawer/>
      <Overlay>
            {dialogContext.dialog}
      </Overlay>
      <div className="flex flex-col h-[100vh]">
        <div>
          <NavBar/>
        </div>
        <div className="flex-grow overflow-hidden">
          <Routes>
              <Route path='/' element={<HomePage/>}/>

              <Route path='/my-gyms' element={<MyGyms/>}/>
              <Route path='/join-gym' element={<JoinGym/>}/>
              <Route path='/create-gym' element={<CreateGym/>}/>
              <Route path='/gym/:gym/*' /*loader={({params})=>{return params}}*/ element={<GymMenu/>}/>

              <Route path='/suggestion' element={<Suggestion/>}/>
              <Route path='/settings' element={<Settings/>}/>
              <Route path='/log-in' element={<LogIn/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route path='/profile-config' element={<ProfileConfig/>}/>
            </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
