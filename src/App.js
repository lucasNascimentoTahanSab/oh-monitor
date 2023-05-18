/**
 * @file Módulo responsável pela exibição da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
import './App.css';
import { useEffect, useRef, useState } from 'react';
import Classroom from './components/ClassroomComponents/Classroom/Classroom.js';
import ToastEventContext from './components/Context/ToastEventContext/ToastEventContext';
import ModalToast from './components/ModalComponents/ModalToast/ModalToast';

function App() {
  const [toastEvent, setToastEvent] = useState(null);
  const [showToastEvent, setShowToastEvent] = useState(false);
  const appRef = useRef(null);

  /**
   * Hook responsável pela apresentação de toast ao usuário quando evento
   * disparado internamente.
   */
  useEffect(() => {
    if (!toastEvent) { return; }
    if (showToastEvent) { return; }

    toastEvent.show(setToastEvent, setShowToastEvent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastEvent]);

  /**
   * Método responsável pelo fechamento do modal, por decisão do usuário ou
   * tempo de exibição atingido.
   */
  function unmountToastEvent() {
    toastEvent?.unmountToastEvent(setToastEvent, setShowToastEvent)
  }

  function updateToastEvent(updatedToastEvent) {
    unmountToastEvent();

    setToastEvent(updatedToastEvent);
  }

  function getToastEvent() {
    return showToastEvent ? <ModalToast toastEvent={toastEvent} app={appRef} isOpen={showToastEvent} unmountToast={unmountToastEvent} /> : null;
  }

  return (
    <ToastEventContext.Provider value={[toastEvent, updateToastEvent]}>
      <div className='App' ref={appRef}>
        {getToastEvent()}
        <Classroom uid='subject' />
      </div>
    </ToastEventContext.Provider>
  );
}

export default App;
