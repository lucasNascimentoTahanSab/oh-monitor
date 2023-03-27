import React from 'react';
import ClassroomStageSection from '../ClassroomStageSection/ClassroomStageSection';

function ClassroomStageSections(props) {
  function getSections() {
    if (!Array.isArray(props.tab?.attributes?.sections?.data)) { return null; }

    return props.tab.attributes.sections.data.map(section => <ClassroomStageSection key={section.attributes?.uuid} section={section} />);
  }

  return (
    <section className='classroom__content'>
      <h2>{props.tab?.attributes?.title}</h2>
      <div className='classroom__content-sections'>
        {getSections()}
      </div>
    </section>
  );
}

export default ClassroomStageSections;