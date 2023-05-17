/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import Builder from '../../../classes/util/Builder.js';
import ClassroomStageSubsection from '../ClassroomStageSubsection/ClassroomStageSubsection.js';
import SectionContext from '../../Context/SectionContext/SectionContext.js';
import SectionsContext from '../../Context/SectionsContext/SectionsContext.js';
import Util from '../../../classes/util/Util.js';

function ClassroomStageSection(props) {
  const [sections, setSections] = useContext(SectionsContext);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => setCurrentSection(props.section), [props.section]);

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getElements() {
    if (!currentSection?.elements?.length) { return null; }

    return currentSection.elements.map(element => Builder.getElement(element));
  }

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getSubsections() {
    if (!currentSection?.sections?.length) { return null; }

    return currentSection.sections.map(subsection => <ClassroomStageSubsection key={subsection.uid} subsection={subsection} />);
  }

  /**
   * Método responsável pela atualização da seção atual assim como sua correspondente
   * em seções da guia.
   * 
   * @param {object} section 
   */
  function updateCurrentSection(section) {
    Util.setCurrentItem(sections, setSections)(section);
  }

  return (
    <SectionContext.Provider value={[currentSection, updateCurrentSection]}>
      <section id={currentSection?.uid} className='classroom__content'>
        <h2>{currentSection?.title}</h2>
        <div className='classroom__content-section'>
          {getElements()}
          {getSubsections()}
        </div>
      </section>
    </SectionContext.Provider>
  );
}

export default ClassroomStageSection;