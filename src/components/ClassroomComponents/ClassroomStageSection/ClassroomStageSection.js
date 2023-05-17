/**
 * @file Módulo responsável pela exibição da seção atual e seus respectivos elementos.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Builder from '../../../classes/util/Builder.js';
import ClassroomStageSubsection from '../ClassroomStageSubsection/ClassroomStageSubsection.js';

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

  /**
   * Método responsável pela exibição dos elementos da seção em página.
   * 
   * @returns {array}
   */
  function getSubsections() {
    if (!section?.sections?.length) { return null; }

    return section.sections.map(subsection => <ClassroomStageSubsection key={subsection.uid} subsection={subsection} />);
  }

  return (
    <section id={section?.uid} className='classroom__content'>
      <h2>{section?.title}</h2>
      <div className='classroom__content-section'>
        {getElements()}
        {getSubsections()}
      </div>
    </section>
  );
}

export default ClassroomStageSection;