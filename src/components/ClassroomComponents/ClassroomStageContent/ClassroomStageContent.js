import React, { useContext } from 'react';
import { ExerciseContext } from '../../Context/ExerciseContext/ExerciseContext';
import ClassroomStageExercises from '../ClassroomStageExercises/ClassroomStageExercises';
import ClassroomStageSections from '../ClassroomStageSections/ClassroomStageSections';

function ClassroomStageContent(props) {
  const [exercises,] = useContext(ExerciseContext);

  function getExercises() {
    return exercises?.length ? <ClassroomStageExercises /> : null;
  }

  return (
    <div className='section classroom-screen__content'>
      <ClassroomStageSections />
      {getExercises()}
    </div>
  );
}

export default ClassroomStageContent;