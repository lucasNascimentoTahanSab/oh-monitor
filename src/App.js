/**
 * @file Módulo responsável pela exibição da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
import './App.css';
import Classroom from './components/ClassroomComponents/Classroom/Classroom.js';

function App() {
  return (
    <div className='App'>
      <Classroom uuid='a3657d92-cca3-11ed-afa1-0242ac120002' />
    </div>
  );
}

export default App;
