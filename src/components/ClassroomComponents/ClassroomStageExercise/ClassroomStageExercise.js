import React from 'react';
import ClassroomStageExerciseAnswer from '../ClassroomStageExerciseAnswer/ClassroomStageExerciseAnswer';

function ClassroomStageExercise(props) {
  function getQuestionAnswers() {
    if (!Array.isArray(props.exercise?.attributes?.answers?.data)) { return null; }

    return props.exercise.attributes.answers.data.map((answer, index) =>
      <ClassroomStageExerciseAnswer key={answer.attributes?.uuid} answer={answer} index={index} />
    );
  }

  return (
    <li id={props.exercise?.attributes?.uuid} className='exercise__question-statement'>
      <span>{props.exercise?.attributes?.statement}</span>
      <ul className='exercise__question-answers'>
        {getQuestionAnswers()}
      </ul>
    </li>
  );
}

export default ClassroomStageExercise;