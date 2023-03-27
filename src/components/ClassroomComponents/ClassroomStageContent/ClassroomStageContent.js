import React from 'react';
import ClassroomStageExercises from '../ClassroomStageExercises/ClassroomStageExercises';
import ClassroomStageSections from '../ClassroomStageSections/ClassroomStageSections';

function ClassroomStageContent(props) {
  function getExercises() {
    return Array.isArray(props.tab?.attributes?.exercises?.data)
      ? <ClassroomStageExercises exercises={props.tab?.attributes?.exercises?.data} />
      : null;
  }

  return (
    <div className='section classroom-screen__content'>
      <ClassroomStageSections tab={props.tab} />
      {getExercises()}
    </div>
  );
}

export default ClassroomStageContent;