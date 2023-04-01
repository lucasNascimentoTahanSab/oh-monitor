import React from 'react';
import { getElement } from '../../../classes/element';
import CodeEditor from '../../CodeComponents/CodeEditor/CodeEditor';

function ClassroomStageSection(props) {
  function getElements() {
    if (!props.section?.attributes?.elements?.data?.length) { return null; }

    return props.section.attributes.elements.data.map(element => getElement(element));
  }

  function getCode() {
    if (!props.section?.attributes?.codes?.data?.length) { return null; }

    return <CodeEditor files={props.section.attributes.codes.data} />;
  }

  return (
    <section id={props.section?.attributes?.uuid} className='classroom__content-section'>
      <h3>{props.section?.attributes?.title}</h3>
      <div className='classroom__content-section-item'>
        {getElements()}
        {getCode()}
      </div>
    </section>
  );
}

export default ClassroomStageSection;