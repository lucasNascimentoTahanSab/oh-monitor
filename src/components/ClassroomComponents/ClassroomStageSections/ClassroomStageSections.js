import React, { useContext } from 'react';
import { TabContext } from '../../Context/TabContext/TabContext';
import ClassroomStageSection from '../ClassroomStageSection/ClassroomStageSection';

function ClassroomStageSections(props) {
  const [tab,] = useContext(TabContext);

  function getSections() {
    if (!tab?.attributes?.sections?.data?.length) { return null; }

    return tab.attributes.sections.data.map(section => <ClassroomStageSection key={section.attributes?.uuid} section={section} />);
  }

  return (
    <section className='classroom__content'>
      <h2>{tab?.attributes?.title}</h2>
      <div className='classroom__content-sections'>
        {getSections()}
      </div>
    </section>
  );
}

export default ClassroomStageSections;