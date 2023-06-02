/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar.js';
import ClassroomStage from '../ClassroomStage/ClassroomStage.js';
// import ClassroomNavigation from '../ClassroomNavigation/ClassroomNavigation.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import SubjectContext from '../../Context/SubjectContext/SubjectContext.js';
import UserContext from '../../Context/UserContext/UserContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import Subject from '../../../classes/strapi/Subject.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import Util from '../../../classes/util/Util.js';
import User from '../../../classes/strapi/user/User.js';

function Classroom(props) {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [snippets, setSnippets] = useState(new Map());
  const [loading, setLoading] = useState(false);

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UID recebido.
   */
  useEffect(() => {
    getMe();
    getSubject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Método responsável pela recuperação do conteúdo a ser exibido em sala de
   * aula a partir do UID recebido.
   */
  function getSubject() {
    setLoading(true);

    callouts.content.getSubject(props.uid)
      .then(result => updateSubject(result))
      .catch(error => setToastEvent(calloutError.content(error)));
  }

  function updateSubject(result) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) { return setToastEvent(calloutError.content(result.error)); }

    const retrievedSubject = new Subject(result?.data?.[0]);
    const retrievedCurrentTab = Util.getCurrentItem(retrievedSubject.tabs);

    setSubject(retrievedSubject);
    setTabs(retrievedSubject.tabs);
    setCurrentTab(retrievedCurrentTab);
    setLoading(false);
  }

  /**
   * Método responsável pela recuperação do usuário atual a partir do token 
   * definido em sessão (quando autenticado).
   */
  function getMe() {
    setLoading(true);

    callouts.content.getMe()
      .then(result => updateUser(result))
      .catch(error => setToastEvent(calloutError.content(error)));
  }

  function updateUser(result) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) { return setToastEvent(calloutError.content(result.error)); }

    const newUser = new User(result);

    setUser(newUser);
  }

  /**
   * Método responsável pela atualização das guias, assim como suas correspondentes
   * no assunto e guia atual.
   * 
   * @param {array} tabs 
   */
  function updateTabs(tabs) {
    const newSubject = new Subject({ ...subject, tabs });
    const retrievedCurrentTab = Util.getCurrentItem(newSubject.tabs);

    setSubject(newSubject);
    setTabs(newSubject.tabs);
    setCurrentTab(retrievedCurrentTab);
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

  /**
   * Método responsável pela atualização do usuário a partir das informações recebidas.
   * 
   * @param {object} user 
   */
  function updateUserState(user) {
    setUser(new User(user));

    console.log(new User(user));
  }

  function getClassroom() {
    return loading ? (<LoadingComponent width='1.75rem' height='1.75rem' />) : getComponent();
  }

  function getComponent() {
    return (
      <div className='tcc-classroom'>
        <ClassroomSidebar />
        <ClassroomStage />
        {/* <ClassroomNavigation /> */}
      </div>
    );
  }

  return (
    <UserContext.Provider value={[user, updateUserState]}>
      <SubjectContext.Provider value={[subject, setSubject]}>
        <TabsContext.Provider value={[tabs, updateTabs]}>
          <TabContext.Provider value={[currentTab, updateCurrentTab]}>
            <SnippetsContext.Provider value={[snippets, setSnippets]}>
              {getClassroom()}
            </SnippetsContext.Provider>
          </TabContext.Provider>
        </TabsContext.Provider>
      </SubjectContext.Provider>
    </UserContext.Provider>
  );
}

export default Classroom;