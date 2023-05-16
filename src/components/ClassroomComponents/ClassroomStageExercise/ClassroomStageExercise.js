/**
 * @file Módulo responsável pela exibição do exercício em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomStageExerciseAnswer from '../ClassroomStageExerciseAnswer/ClassroomStageExerciseAnswer.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import Util from '../../../classes/util/Util.js';

function ClassroomStageExercise(props) {
  const [exercises, setExercises] = useContext(ExercisesContext);
  const [exercise, setExercise] = useState(null);
  const [answers, setAnswers] = useState(null);

  useEffect(() => setExercise(props.exercise), [props.exercise]);

  useEffect(() => setAnswers(props.exercise?.answers), [props.exercise]);

  /**
   * Método responsável pela exibição das respostas para o exercício em questão.
   * 
   * @returns {array}
   */
  function getExerciseAnswers() {
    if (!exercise?.answers?.length) { return null; }

    return exercise.answers.map((answer, index) =>
      <ClassroomStageExerciseAnswer
        key={answer.uuid}
        answer={answer}
        index={index}
        group={`${exercise.uuid}-classroom-stage-exercise-radio-group`}
        selectAnswer={Util.setCurrentItem(answers, updateAnswers)} />
    );
  }

  /**
   * Método responsável pela atualização das respostas em exercícios propostas.
   * 
   * @param {array} answers 
   */
  function updateAnswers(answers) {
    Util.updateItemIn(exercises, setExercises)({ ...exercise, answers });
  }

  return (
    <li id={exercise?.uuid} className='exercise__question-statement'>
      <span>{exercise?.statement}</span>
      <ul className='exercise__question-answers'>
        {getExerciseAnswers()}
      </ul>
    </li>
  );
}

export default ClassroomStageExercise;