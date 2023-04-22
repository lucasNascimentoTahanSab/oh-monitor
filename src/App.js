import './App.css';
import Classroom from './components/ClassroomComponents/Classroom/Classroom';
import { ConfigContext } from './components/Context/ConfigContext/ConfigContext';
import config from './config.json';

function App() {
  return (
    <ConfigContext.Provider value={config}>
      <div className="App">
        <Classroom uuid='a3657d92-cca3-11ed-afa1-0242ac120002' />
      </div>
    </ConfigContext.Provider>
  );
}

export default App;
