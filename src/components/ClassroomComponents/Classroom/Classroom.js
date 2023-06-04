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
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import Subject from '../../../classes/strapi/Subject.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';

function Classroom(props) {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [snippets, setSnippets] = useState(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => { setUser(props.user); }, [props.user]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getSubject() }, []);

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

    Util.handle(props.setUser, props.user, retrievedSubject);

    setSubject(retrievedSubject);
    setTabs(retrievedSubject.tabs);
    setCurrentTab(retrievedCurrentTab);
    setLoading(false);
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

    Util.handle(props.setUser, user, newSubject);

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
    <TabsContext.Provider value={[tabs, updateTabs]}>
      <TabContext.Provider value={[currentTab, updateCurrentTab]}>
        <SnippetsContext.Provider value={[snippets, setSnippets]}>
          {getClassroom()}
        </SnippetsContext.Provider>
      </TabContext.Provider>
    </TabsContext.Provider>
  );
}

export default Classroom;