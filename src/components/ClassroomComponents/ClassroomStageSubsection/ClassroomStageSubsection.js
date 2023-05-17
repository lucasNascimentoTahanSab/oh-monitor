/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import SubsectionsContext from '../../Context/SubsectionsContext/SubsectionsContext.js';
import SubsectionContext from '../../Context/SubsectionContext/SubsectionContext.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import Section from '../../../classes/strapi/Section.js';
import Builder from '../../../classes/util/Builder.js';
import Util from '../../../classes/util/Util.js';

function ClassroomStageSubsection(props) {
  const [subsections, setSubsections] = useContext(SubsectionsContext);
  const [currentSubsection, setCurrentSubsection] = useState(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    setCurrentSubsection(props.subsection);
    setElements(props.subsection?.elements);
  }, [props.subsection]);

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getElements() {
    if (!currentSubsection?.elements?.length) { return null; }

    return currentSubsection.elements.map(element => Builder.getElement(element));
  }

  /**
   * Método responsável pela atualização da subseção atual assim como sua correspondente
   * em seção.
   * 
   * @param {object} subsection 
   */
  function updateCurrentSubsection(subsection) {
    Util.setCurrentItem(subsections, setSubsections)(subsection);
  }

  /**
   * Método responsável pela atualização dos elementos em subseção atual.
   * 
   * @param {array} elements 
   */
  function updateElements(elements) {
    const newCurrentSubsection = new Section({ ...currentSubsection, elements });

    updateCurrentSubsection(newCurrentSubsection);
  }

  return (
    <SubsectionContext.Provider value={[currentSubsection, updateCurrentSubsection]}>
      <ElementsContext.Provider value={[elements, updateElements]}>
        <section id={currentSubsection?.uid} className='classroom__content-section'>
          <h3>{currentSubsection?.title}</h3>
          <div className='classroom__content-section'>
            {getElements()}
          </div>
        </section>
      </ElementsContext.Provider>
    </SubsectionContext.Provider>
  );
}

export default ClassroomStageSubsection;