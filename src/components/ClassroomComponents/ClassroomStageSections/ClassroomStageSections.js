/**
 * @file Módulo responsável pela exibição das seções da guia atual.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext } from 'react';
import ClassroomStageSection from '../ClassroomStageSection/ClassroomStageSection.js';
import TabContext from '../../Context/TabContext/TabContext.js';

function ClassroomStageSections(props) {
  const [tab,] = useContext(TabContext);

  /**
   * Método responsável pela exibição das seções da guia atual.
   * 
   * @returns {array}
   */
  function getSections() {
    if (!tab?.sections?.length) { return null; }

    return tab.sections.map(section => <ClassroomStageSection key={section.uuid} section={section} />);
  }

  return (
    <section className='classroom__content'>
      <h2>{tab?.title}</h2>
      <div className='classroom__content-sections'>
        {getSections()}
      </div>
    </section>
  );
}

export default ClassroomStageSections;