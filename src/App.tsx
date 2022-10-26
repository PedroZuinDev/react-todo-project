
import './App.css';
import {NavBarPersonalite} from "../src/components/Navbar/navbar";
import { TasksScreen } from './screens/tasks';

function App() {
  return (
      <div className="container flex-row justify-center items-center mr-auto ml-auto mt-10 w-auto rounded" >
          <NavBarPersonalite />
          <TasksScreen />
      </div>
  );
}

export default App;
