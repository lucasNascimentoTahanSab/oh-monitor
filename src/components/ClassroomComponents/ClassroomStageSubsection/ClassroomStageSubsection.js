/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Builder from '../../../classes/util/Builder.js';

function ClassroomStageSubsection(props) {
  const [subsection, setSubsection] = useState(null);

  useEffect(() => setSubsection(props.subsection), [props.subsection]);

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getElements() {
    if (!subsection?.elements?.length) { return null; }

    return subsection.elements.map(element => Builder.getElement(element));
  }

  return (
    <section id={subsection?.uid} className='classroom__content-section'>
      <h3>{subsection?.title}</h3>
      <div className='classroom__content-section'>
        {getElements()}
      </div>
    </section>
  );
}

export default ClassroomStageSubsection;