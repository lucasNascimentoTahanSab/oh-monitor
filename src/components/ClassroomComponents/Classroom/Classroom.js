/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar.js';
import ClassroomStage from '../ClassroomStage/ClassroomStage.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import PromisesContext from '../../Context/PromisesContext/PromisesContext.js';
import User from '../../../classes/strapi/user/User.js';
import Subject from '../../../classes/strapi/Subject.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import Util from '../../../classes/util/Util.js';

function Classroom(props) {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [user, setUser] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [promises, setPromises] = useState(new Map());

  useEffect(() => { setUser({ ...props.user, screen: window.location.pathname }); }, [props.user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getSubject() }, []);

  /**
   * Método responsável pela recuperação do conteúdo a ser exibido em sala de
   * aula a partir do UID recebido.
   */
  function getSubject() {
    setLoading(true);

    callouts.content.getSubject(Util.getURLLastPathname())
      .then(result => updateSubject(result))
      .catch(error => setToastEvent(calloutError.content(error)));
  }

  function updateSubject(result) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) {
      if (result.error?.name === 'InternalServerError') { Util.redirectToSignIn(); }

      return setToastEvent(calloutError.content(result.error));
    }

    const newUser = getNewUser(result);

    Util.handle(props.setUser, newUser);

    const newSubject = newUser.state.get(Util.getURLLastPathname());
    const newCurrentTab = Util.getCurrentItem(newSubject.tabs);

    setTabs(newSubject.tabs);
    setCurrentTab(newCurrentTab);
    setLoading(false);
  }

  function getNewUser(result) {
    const newUser = new User(props.user);

    newUser.updateState(new Subject(result?.data?.[0]));

    return newUser;
  }

  /**
   * Método responsável pela atualização do status das Promises disparadas por guia
   * antes de permitir a transição do usuário entre guias.
   * 
   * @param {object} promise 
   */
  function updatePromiseInPromises(promise) {
    promises.set(promise.uid, promise);

    setPromises(promises);

    updateCurrentTab({ ...currentTab, loading: Boolean(Util.getLoadingItem(Array.from(promises.values()))) });
  }

  function clearPromises() {
    setPromises(new Map());
  }

  /**
   * Método responsável pela atualização das guias, assim como suas correspondentes
   * no assunto e guia atual.
   * 
   * @param {array} tabs 
   */
  function updateTabs(tabs) {
    const subjectUid = Util.getURLLastPathname();

    updateUserState(subjectUid, tabs);

    Util.handle(props.setUser, user);

    const newSubject = user.state.get(subjectUid);
    const retrievedCurrentTab = Util.getCurrentItem(newSubject.tabs);

    setTabs(newSubject.tabs);
    setCurrentTab(retrievedCurrentTab);
  }

  function updateUserState(subjectUid, tabs) {
    const oldSubject = user.state.get(subjectUid);
    const newSubject = new Subject({ ...oldSubject, tabs });

    user.state.set(oldSubject.uid, newSubject);
  }

  /**
   * Método responsável pela atualização da guia atual assim como sua correspondente
   * em guias.
   * 
   * @param {object} currentTab 
   */
  function updateCurrentTab(currentTab) {
    Util.updateItemIn(tabs, updateTabs)(currentTab);
  }

  function getClassroom() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : getComponent();
  }

  function getComponent() {
    return (
      <div className='tcc-classroom'>
        <ClassroomSidebar />
        <ClassroomStage />
      </div>
    );
  }

  return (
    <PromisesContext.Provider value={[updatePromiseInPromises, clearPromises]}>
      <TabsContext.Provider value={[tabs, updateTabs]}>
        <TabContext.Provider value={[currentTab, updateCurrentTab]}>
          {getClassroom()}
        </TabContext.Provider>
      </TabsContext.Provider>
    </PromisesContext.Provider>
  );
}

export default Classroom;