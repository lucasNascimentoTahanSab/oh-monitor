import React from 'react';
import { getElement } from '../../classes/element';

function SubjectSection(props) {
  function getElements() {
    if (!Array.isArray(props.section?.elements?.data)) { return null; }

    return props.section.elements.data.map(element => getElement(element));
  }

  return (
    <section className='classroom__content-section'>
      <h3>{props.section?.title}</h3>
      <div className='classroom__content-section-item'>
        {getElements()}
      </div>
    </section>
  );
}

export default SubjectSection;