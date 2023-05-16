/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Builder from '../../../classes/util/Builder.js';

function ClassroomStageSection(props) {
  const [section, setSection] = useState(null);

  useEffect(() => setSection(props.section), [props.section]);

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getElements() {
    if (!section?.elements?.length) { return null; }

    return section.elements.map(element => Builder.getElement(element));
  }

  return (
    <section id={section?.uuid} className='classroom__content-section'>
      <h3>{section?.title}</h3>
      <div className='classroom__content-section-item'>
        {getElements()}
      </div>
    </section>
  );
}

export default ClassroomStageSection;