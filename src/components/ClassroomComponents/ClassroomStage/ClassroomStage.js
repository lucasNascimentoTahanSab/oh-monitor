/**
 * @file Módulo responsável pela exibição do conteúdo da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import ClassroomStageSection from '../ClassroomStageSection/ClassroomStageSection.js';
import TabContext from '../../Context/TabContext/TabContext.js';

function ClassroomStage() {
  const [currentTab,] = useContext(TabContext);

  /**
   * Método responsável pela exibição das seções da guia atual.
   * 
   * @returns {array}
   */
  function getSections() {
    if (!currentTab?.sections?.length) { return null; }

    return currentTab.sections.map(section => <ClassroomStageSection key={section.uid} section={section} />);
  }

  return (
    <div className='section classroom-screen__content'>
      {getSections()}
    </div>
  );
}

export default ClassroomStage;