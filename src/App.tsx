
import './App.css';
import {NavBarPersonalite} from "../src/components/Navbar/navbar";
import { TasksScreen } from './screens/tasks';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { HomeScreen } from './screens/home';

function App() {
  return (
      <div className="container flex-row justify-center items-center mr-auto ml-auto mt-10 w-11/12 rounded" >
          <Router basename='/app'>   
              <NavBarPersonalite />
              <div className="grid grid-cols-1 bg-white w-auto justify-center p-10 rounded">
                <Routes>
                  <Route path='/' element={ <HomeScreen />} />
                  <Route path='/tasks' element={ <TasksScreen />} />
                </Routes>
              </div>
            </Router>
      </div>
  );
}

export default App;
