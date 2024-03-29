/**
 * @file Módulo responsável pela exibição da aplicação.
 * @copyright Lucas N. T. Sab 2023
 */
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Classroom from './components/ClassroomComponents/Classroom/Classroom.js';
import IframeComponent from './components/IframeComponents/IframeComponent/IframeComponent';
import ThankYou from './components/ThankYouComponents/ThankYou/ThankYou';
import FormSignIn from './components/FormComponents/FormSignIn/FormSignIn';
import FormSignUp from './components/FormComponents/FormSignUp/FormSignUp';
import LoadingComponent from './components/LoadingComponents/LoadingComponent/LoadingComponent';
import Modal from './components/ModalComponents/Modal/Modal';
import ModalToast from './components/ModalComponents/ModalToast/ModalToast';
import ModalConfirmation from './components/ModalComponents/ModalConfirmation/ModalConfirmation';
import UserContext from './components/Context/UserContext/UserContext';
import ToastEventContext from './components/Context/ToastEventContext/ToastEventContext';
import ModalEventContext from './components/Context/ModalEventContext/ModalEventContext';
import User from './classes/strapi/user/User.js';
import callouts from './classes/callouts/callout.js';
import calloutError from './classes/callouts/calloutError.js';
import Util from './classes/util/Util';
import config from './config.json';

const USER = { timeout: null };

function App() {
  const [user, setUser] = useState(null);
  const [toastEvent, setToastEvent] = useState(null);
  const [showToastEvent, setShowToastEvent] = useState(false);
  const [modalConfirmationEvent, setModalConfirmationEvent] = useState(null);
  const [showModalConfirmationEvent, setShowModalConfirmationEvent] = useState(false);
  const [loading, setLoading] = useState(true);
  const appRef = useRef(null);

  function updateToastEvent(updatedToastEvent) {
    unmountToastEvent();

    setToastEvent(updatedToastEvent);
  }

  /**
   * Método responsável pelo fechamento do modal, por decisão do usuário ou
   * tempo de exibição atingido.
   */
  function unmountToastEvent() {
    toastEvent?.unmountToastEvent(setToastEvent, setShowToastEvent);
  }

  function getToastEvent() {
    return (
      <Modal
        modalEvent={toastEvent}
        setModalEvent={setToastEvent}
        showModalEvent={showToastEvent}
        setShowModalEvent={setShowToastEvent}
        unmount={unmountToastEvent}>
        <ModalToast
          app={appRef}
          toastEvent={toastEvent}
          isOpen={showToastEvent}
          unmountToast={unmountToastEvent} />;
      </Modal>
    );
  }

  function updateModalConfirmationEvent(updatedModalConfirmationEvent) {
    setModalConfirmationEvent(updatedModalConfirmationEvent);
  }

  /**
   * Método responsável pelo fechamento do modal de confirmação.
   */
  function unmountModalConfirmationEvent() {
    modalConfirmationEvent?.unmountModalEvent(setModalConfirmationEvent, setShowModalConfirmationEvent);
  }

  function getModalConfirmationEvent() {
    return (
      <Modal
        modalEvent={modalConfirmationEvent}
        setModalEvent={setModalConfirmationEvent}
        showModalEvent={showModalConfirmationEvent}
        setShowModalEvent={setShowModalConfirmationEvent}
        unmount={unmountModalConfirmationEvent}>
        <ModalConfirmation
          app={appRef}
          modalConfirmationEvent={modalConfirmationEvent}
          isOpen={showModalConfirmationEvent}
          unmountModal={unmountModalConfirmationEvent} />;
      </Modal>
    );
  }

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UID recebido.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (isUserAuthenticated()) { getMe(); } }, []);

  /**
   * Método responsável por indicar se usuário autenticado ou não. Caso em telas de signin e
   * signup, usuário não está autenticado.
   * 
   * @returns {boolean}
   */
  function isUserAuthenticated() {
    return !window.location.pathname.includes('signin') && !window.location.pathname.includes('signup');
  }

  /**
   * Método responsável pela recuperação do usuário atual a partir do token 
   * definido em sessão (quando autenticado).
   */
  function getMe() {
    setLoading(true);

    callouts.content.getMe()
      .then(result => updateMe(result))
      .catch(error => setToastEvent(calloutError.content(error)));
  }

  function updateMe(result) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) {
      if (result.error?.name === 'InternalServerError') { Util.redirectToSignIn(); }

      return setToastEvent(calloutError.content(result.error));
    }

    setUser(new User(result));
    setLoading(false);
  }

  /**
   * Método responsável pela atualização do usuário em memória e agendamento de atualização
   * em banco de dados.
   * 
   * @param {object} user 
   */
  function updateUser(user) {
    const newUser = new User(user);

    setUser(newUser);

    updateUserInDB(newUser);
  }

  /**
   * Método responsável pela atualização periódica do usuário em banco de dados de acordo com
   * parâmetro de timeout definido em arquivo de configuração. A chamada ao endpoint não é
   * disparada a cada atualização para evitar sobrecarga do servidor.
   * 
   * @param {object} user 
   */
  function updateUserInDB(user) {
    clearTimeout(USER.timeout);

    USER.timeout = setTimeout(() => callouts.content.updateMe(user), config.user.timeout);
  }

  function getSignUp() {
    return (<FormSignUp />);
  }

  function getSignIn() {
    return (<FormSignIn />);
  }

  function getTCLEForm() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : (
      <IframeComponent
        user={user}
        setUser={updateUser}
        title='TCLE'
        src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSc2c8MahiRGREJsJf5aMIC8-y9GeeRT8NRcwcn1RBUvG0RNjw'
      />
    );
  }

  function getBackgroundForm() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : (
      <IframeComponent
        user={user}
        setUser={updateUser}
        title='Background'
        src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSfnA3stjPVFsRKY2Whit4A8CIoxhBkHCLKE3BKDt-Ux3tQM6w'
      />
    );
  }

  function getClassroom() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : (<Classroom user={user} setUser={updateUser} />);
  }

  function getFeedbackForm() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : (
      <IframeComponent
        user={user}
        setUser={updateUser}
        title='Feedback'
        src='https://formfacade.com/headless/114665449259210015555/home/form/1FAIpQLSd2XpOzx0CK6fQECteGZbP0LcKmEU5iLTdVpSPx926zPscHFw'
      />
    );
  }

  function getThankYou() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : (<ThankYou user={user} setUser={updateUser} />);
  }

  return (
    <ToastEventContext.Provider value={[toastEvent, updateToastEvent]}>
      <UserContext.Provider value={[user, updateUser]}>
        <ModalEventContext.Provider value={[modalConfirmationEvent, updateModalConfirmationEvent]}>
          <div className='App' ref={appRef}>
            {getToastEvent()}
            {getModalConfirmationEvent()}
            <BrowserRouter>
              <Routes>
                <Route path='/signup' element={getSignUp()} />
                <Route path='/signin' element={getSignIn()} />
                <Route path='/tcle' element={getTCLEForm()} />
                <Route path='/background' element={getBackgroundForm()} />
                <Route path='/classroom/:uid' element={getClassroom()} />
                <Route path='/feedback' element={getFeedbackForm()} />
                <Route path='/thanks' element={getThankYou()} />
              </Routes>
            </BrowserRouter>
          </div>
        </ModalEventContext.Provider>
      </UserContext.Provider>
    </ToastEventContext.Provider>
  );
}

export default App;
