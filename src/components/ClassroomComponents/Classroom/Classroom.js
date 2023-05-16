/**
 * @file Módulo responsável pelo carregamento da sala de aula a partir do UUID do 
 * assunto tratado.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import ClassroomSidebar from '../ClassroomSidebar/ClassroomSidebar';
import ClassroomStage from '../ClassroomStage/ClassroomStage';
import ClassroomNavigation from '../ClassroomNavigation/ClassroomNavigation';
import TabContext from '../../Context/TabContext/TabContext';
import TabsContext from '../../Context/TabsContext/TabsContext';
import SnippetsContext from '../../Context/SnippetsContext/SnippetsContext';
import PackagesContext from '../../Context/PackagesContext/PackagesContext';
import Subject from '../../../classes/strapi/Subject';
import Util from '../../../classes/Util';
import callouts from '../../../classes/callout';

function Classroom(props) {
  const [subject, setSubject] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);
  const [snippets, setSnippets] = useState(new Map());
  const [packages, setPackages] = useState(new Map());

  /**
   * Hook responsável pela obtenção do registro do assunto tratado na tela atual
   * a partir do UUID recebido.
   */
  useEffect(() => { if (!subject) { getSubject(); } });

  async function getSubject() {
    const retrievedSubject = new Subject((await callouts.content.getSubject(props.uuid))?.data?.[0]);
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