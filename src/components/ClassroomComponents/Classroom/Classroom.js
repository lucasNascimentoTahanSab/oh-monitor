/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar.js';
import ClassroomStage from '../ClassroomStage/ClassroomStage.js';
// import ClassroomNavigation from '../ClassroomNavigation/ClassroomNavigation.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import Subject from '../../../classes/strapi/Subject.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';
import SubjectContext from '../../Context/SubjectContext/SubjectContext.js';
import LoadingComponent from '../../LoadingComponents/LoadingComponent/LoadingComponent.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import calloutError from '../../../classes/callouts/calloutError.js';

function Classroom(props) {
  const [, setToastEvent] = useContext(ToastEventContext);
  const [subject, setSubject] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [snippets, setSnippets] = useState(new Map());
  const [loading, setLoading] = useState(false);

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UID recebido.
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getSubject(); }, []);

  async function getSubject() {
    setLoading(true);

    callouts.content.getSubject(props.uid)
      .then(result => updateSubject(result))
      .catch(error => setToastEvent(calloutError.content(error)));
  }

  function updateSubject(result) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result.name === 'Error') { return setToastEvent(calloutError.content(result)); }

    const retrievedSubject = new Subject(result?.data?.[0]);
    const retrievedCurrentTab = Util.getCurrentItem(retrievedSubject.tabs);

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
        {/* <ClassroomNavigation /> */}
      </div>
    );
  }

  return (
    <SubjectContext.Provider value={[subject, setSubject]}>
      <TabsContext.Provider value={[tabs, updateTabs]}>
        <TabContext.Provider value={[currentTab, updateCurrentTab]}>
          <SnippetsContext.Provider value={[snippets, setSnippets]}>
            {getClassroom()}
          </SnippetsContext.Provider>
        </TabContext.Provider>
      </TabsContext.Provider>
    </SubjectContext.Provider>
  );
}

export default Classroom;