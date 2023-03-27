import React from 'react';
import { getElement } from '../../../classes/element';

function ClassroomStageSection(props) {
  function getElements() {
    if (!Array.isArray(props.section?.attributes?.elements?.data)) { return null; }

    return props.section.attributes.elements.data.map(element => getElement(element));
  }

  return (
    <section id={props.section?.attributes?.uuid} className='classroom__content-section'>
      <h3>{props.section?.attributes?.title}</h3>
      <div className='classroom__content-section-item'>
        {getElements()}
      </div>
    </section>
  );
}

export default ClassroomStageSection;