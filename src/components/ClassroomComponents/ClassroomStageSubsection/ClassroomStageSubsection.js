/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import SubsecionContext from '../../Context/SubsectionContext/SubsectionContext.js';
import Builder from '../../../classes/util/Builder.js';
import SectionContext from '../../Context/SectionContext/SectionContext.js';
import Util from '../../../classes/util/Util.js';

function ClassroomStageSubsection(props) {
  const [section, setSection] = useContext(SectionContext);
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

  /**
   * Método responsável pela atualização da subseção atual assim como sua correspondente
   * em seção.
   * 
   * @param {object} subsection 
   */
  function updateSubsection(subsection) {
    Util.setCurrentItem(section, setSection)(subsection);
  }

  return (
    <SubsecionContext.Provider value={[subsection, updateSubsection]}>
      <section id={subsection?.uid} className='classroom__content-section'>
        <h3>{subsection?.title}</h3>
        <div className='classroom__content-section'>
          {getElements()}
        </div>
      </section>
    </SubsecionContext.Provider>
  );
}

export default ClassroomStageSubsection;