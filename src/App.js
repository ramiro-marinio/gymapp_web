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
import { FirebaseContext } from "./firebase/context";
function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <NavBar/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/my-gyms' element={<MyGyms/>}/>
          <Route path='/suggestion' element={<Suggestion/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/log-in' element={<LogIn/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
    </div>
  );
}

export default App;
