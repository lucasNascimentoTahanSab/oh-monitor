/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar.js';
import ClassroomStage from '../ClassroomStage/ClassroomStage.js';
import ClassroomNavigation from '../ClassroomNavigation/ClassroomNavigation.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext.js';
import PackagesContext from '../../Context/PackagesContext/PackagesContext.js';
import Subject from '../../../classes/strapi/Subject.js';
import Util from '../../../classes/util/Util.js';
import callouts from '../../../classes/callouts/callout.js';

function Classroom(props) {
  const [subject, setSubject] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [snippets, setSnippets] = useState(new Map());
  const [packages, setPackages] = useState(new Map());

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UID recebido.
   */
  useEffect(() => { if (!subject) { getSubject(); } });

  async function getSubject() {
    const retrievedSubject = new Subject((await callouts.content.getSubject(props.uid))?.data?.[0]);
    const retrievedCurrentTab = Util.getCurrentItem(retrievedSubject.tabs);

    setSubject(retrievedSubject);
    setTabs(retrievedSubject.tabs);
    setCurrentTab(retrievedCurrentTab);
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

  return (
    <TabsContext.Provider value={[tabs, updateTabs]}>
      <TabContext.Provider value={[currentTab, updateCurrentTab]}>
        <SnippetsContext.Provider value={[snippets, setSnippets]}>
          <PackagesContext.Provider value={[packages, setPackages]}>
            <div className='classroom'>
              <ClassroomSidebar />
              <ClassroomStage />
              <ClassroomNavigation />
            </div>
          </PackagesContext.Provider>
        </SnippetsContext.Provider>
      </TabContext.Provider>
    </TabsContext.Provider>
  );
}

export default Classroom;