/**
 * @file Módulo responsável pela exibição da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classroom from './components/ClassroomComponents/Classroom/Classroom.js';
import ToastEventContext from './components/Context/ToastEventContext/ToastEventContext';
import ModalToast from './components/ModalComponents/ModalToast/ModalToast';
import IframeComponent from './components/IframeComponents/IframeComponent/IframeComponent';
import FormSignIn from './components/FormComponents/FormSignIn/FormSignIn';
import FormSignUp from './components/FormComponents/FormSignUp/FormSignUp';

function App() {
  const [toastEvent, setToastEvent] = useState(null);
  const [showToastEvent, setShowToastEvent] = useState(false);
  const appRef = useRef(null);

  /**
   * Hook responsável pela apresentação de toast ao usuário quando evento
   * disparado internamente.
   */
  useEffect(() => {
    if (!toastEvent && showToastEvent) { return unmountToastEvent(); }
    if (!toastEvent) { return; }
    if (showToastEvent) { return; }

    toastEvent.show(setToastEvent, setShowToastEvent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastEvent]);

  /**
   * Método responsável pelo fechamento do modal, por decisão do usuário ou
   * tempo de exibição atingido.
   */
  function unmountToastEvent() {
    toastEvent?.unmountToastEvent(setToastEvent, setShowToastEvent);
  }

  function updateToastEvent(updatedToastEvent) {
    unmountToastEvent();

    setToastEvent(updatedToastEvent);
  }

  function getToastEvent() {
    return showToastEvent ? <ModalToast toastEvent={toastEvent} app={appRef} isOpen={showToastEvent} unmountToast={unmountToastEvent} /> : null;
  }

  function getSignUp() {
    return (<FormSignUp />);
  }

  function getSignIn() {
    return (<FormSignIn />);
  }

  function getTCLEForm() {
    return (<IframeComponent title='TCLE' src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSc2c8MahiRGREJsJf5aMIC8-y9GeeRT8NRcwcn1RBUvG0RNjw' />);
  }

  function getBackgroundForm() {
    return (<IframeComponent title='Background' src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSfnA3stjPVFsRKY2Whit4A8CIoxhBkHCLKE3BKDt-Ux3tQM6w' />);
  }

  function getClassroom() {
    return (<Classroom uid='subject' />);
  }

  function getFeedbackForm() {
    return (<IframeComponent title='Feedback' src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSd2XpOzx0CK6fQECteGZbP0LcKmEU5iLTdVpSPx926zPscHFw' />);
  }

  return (
    <ToastEventContext.Provider value={[toastEvent, updateToastEvent]}>
      <div className='App' ref={appRef}>
        {getToastEvent()}
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={getSignUp()} />
            <Route path='/signin' element={getSignIn()} />
            <Route path='/tcle' element={getTCLEForm()} />
            <Route path='/background' element={getBackgroundForm()} />
            <Route path='/classroom' element={getClassroom()} />
            <Route path='/feedback' element={getFeedbackForm()} />
          </Routes>
        </BrowserRouter>
      </div>
    </ToastEventContext.Provider>
  );
}

export default App;
