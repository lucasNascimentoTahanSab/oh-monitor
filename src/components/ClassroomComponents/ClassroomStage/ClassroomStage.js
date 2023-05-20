/**
 * @file Módulo responsável pela exibição do conteúdo da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useRef, useState } from 'react';
import ClassroomStageSection from '../ClassroomStageSection/ClassroomStageSection.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import SectionsContext from '../../Context/SectionsContext/SectionsContext.js';
import Tab from '../../../classes/strapi/Tab.js';

function ClassroomStage() {
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [sections, setSections] = useState([]);
  const stageRef = useRef(null);

  useEffect(() => { stageRef.current.focus(); }, []);

  useEffect(() => { setSections(currentTab?.sections) }, [currentTab?.sections]);

  /**
   * Método responsável pela exibição das seções da guia atual.
   * 
   * @returns {array}
   */
  function getSections() {
    if (!sections?.length) { return null; }

    return sections.map(section => <ClassroomStageSection key={section.uid} section={section} />);
  }

  /**
   * Método responsável pela atualização das seções, assim como suas correspondentes
   * na guia atual.
   * 
   * @param {array} sections 
   */
  function updateSections(sections) {
    const newCurrentTab = new Tab({ ...currentTab, sections });

    setCurrentTab(newCurrentTab);
  }

  return (
    <SectionsContext.Provider value={[sections, updateSections]}>
      <div className='tcc-classroom__section tcc-stage' ref={stageRef}>
        {getSections()}
      </div>
    </SectionsContext.Provider>
  );
}

export default ClassroomStage;