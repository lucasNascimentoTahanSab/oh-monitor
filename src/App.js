/**
 * @file Módulo responsável pela exibição da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
import './App.css';
import Classroom from './components/ClassroomComponents/Classroom/Classroom.js';

function App() {
  return (
    <div className='App'>
      <Classroom uid='subject' />
    </div>
  );
}

export default App;
