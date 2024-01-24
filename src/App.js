import { Route, Routes} from "react-router-dom";
import NavBar from "./components/navigation/navbar";
import './globals.css';
import HomePage from "./components/pages/homepage";
import MyGyms from "./components/pages/mygyms";
import Suggestion from "./components/pages/suggestion";
import Settings from './components/pages/settings';
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/my-gyms' element={<MyGyms/>}/>
          <Route path='/suggestion' element={<Suggestion/>}/>
          <Route path='/settings' element={<Settings/>}/>
        </Routes>
    </div>
  );
}

export default App;
