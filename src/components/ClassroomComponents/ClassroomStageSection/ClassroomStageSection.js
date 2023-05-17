/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomStageSubsection from '../ClassroomStageSubsection/ClassroomStageSubsection.js';
import SectionContext from '../../Context/SectionContext/SectionContext.js';
import SectionsContext from '../../Context/SectionsContext/SectionsContext.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import SubsectionsContext from '../../Context/SubsectionsContext/SubsectionsContext.js';
import Section from '../../../classes/strapi/Section.js';
import Builder from '../../../classes/util/Builder.js';
import Util from '../../../classes/util/Util.js';

function ClassroomStageSection(props) {
  const [sections, setSections] = useContext(SectionsContext);
  const [currentSection, setCurrentSection] = useState(null);
  const [elements, setElements] = useState([]);
  const [subsections, setSubsections] = useState([]);

  useEffect(() => {
    setCurrentSection(props.section);
    setElements(props.section?.elements);
    setSubsections(props.section?.sections);
  }, [props.section]);

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

  /**
   * Método responsável pela atualização dos elementos em seção atual.
   * 
   * @param {array} elements 
   */
  function updateElements(elements) {
    const newCurrentSection = new Section({ ...currentSection, elements });

    updateCurrentSection(newCurrentSection);
  }

  /**
   * Método responsável pela atualização das subseções em seção atual.
   * 
   * @param {array} elements 
   */
  function updateSubsections(subsections) {
    const newCurrentSection = new Section({ ...currentSection, sections: subsections });

    updateCurrentSection(newCurrentSection);
  }

  return (
    <SectionContext.Provider value={[currentSection, updateCurrentSection]}>
      <section id={currentSection?.uid} className='classroom__content'>
        <h2>{currentSection?.title}</h2>
        <div className='classroom__content-section'>
          <ElementsContext.Provider value={[elements, updateElements]}>
            {getElements()}
          </ElementsContext.Provider>
          <SubsectionsContext.Provider value={[subsections, updateSubsections]}>
            {getSubsections()}
          </SubsectionsContext.Provider>
        </div>
      </section>
    </SectionContext.Provider>
  );
}

export default ClassroomStageSection;