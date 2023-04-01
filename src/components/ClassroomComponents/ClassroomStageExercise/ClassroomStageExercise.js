import React, { useContext } from 'react';
import { ExerciseContext } from '../../Context/ExerciseContext/ExerciseContext';
import ClassroomStageExerciseAnswer from '../ClassroomStageExerciseAnswer/ClassroomStageExerciseAnswer';

function ClassroomStageExercise(props) {
  const [exercises, setExercises] = useContext(ExerciseContext);

  function selectAnswer(uuid) {
    const exercise = getExerciseByUuid(props.exercise?.uuid);

    unselectCurrentAnswer(exercise);
    selectAnswerByUuid(uuid, exercise);
    setExercises([...exercises]);
  }

  function selectAnswerByUuid(uuid, exercise) {
    const answer = getAnswerByUuid(uuid, exercise);

    if (!answer) { return; }

    answer.selected = true;
  }

  function getAnswerByUuid(uuid, exercise) {
    if (!exercise?.answers?.length) { return null; }

    return exercise.answers.find(answer => answer.uuid === uuid);
  }

  function unselectCurrentAnswer(exercise) {
    const currentAnswer = getCurrentAnswer(exercise);

    if (!currentAnswer) { return; }

    currentAnswer.selected = false;
  }

  function getCurrentAnswer(exercise) {
    if (!exercise?.answers?.length) { return null; }

    return exercise.answers.find(answer => answer.selected);
  }

  function getExerciseByUuid(uuid) {
    if (!exercises?.length) { return null; }

    return exercises.find(exercise => exercise.uuid === uuid);
  }

  function getExerciseAnswers() {
    if (!props.exercise?.answers?.length) { return null; }

    return props.exercise.answers.map((answer, index) =>
      <ClassroomStageExerciseAnswer key={answer.uuid} answer={answer} index={index} selectAnswer={selectAnswer} />
    );
  }

  return (
    <li id={props.exercise?.uuid} className='exercise__question-statement'>
      <span>{props.exercise?.statement}</span>
      <ul className='exercise__question-answers'>
        {getExerciseAnswers()}
      </ul>
    </li>
  );
}

export default ClassroomStageExercise;