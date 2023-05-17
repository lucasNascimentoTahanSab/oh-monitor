/**
 * @file Módulo responsável pela exibição do exercício em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ExerciseChoices from '../ExerciseChoices/ExerciseChoices.js';
import CodeEditor from '../../CodeComponents/CodeEditor/CodeEditor.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext.js';
import Util from '../../../classes/util/Util.js';

function Exercise(props) {
  const [exercises, setExercises] = useContext(ExercisesContext);
  const [currentExercise, setCurrentExercise] = useState(null);

  useEffect(() => { setCurrentExercise(props.exercise) }, [props.exercise]);

  function getExercise() {
    if (currentExercise?.type === 'choice') { return <ExerciseChoices />; }
    if (currentExercise?.type === 'code') { return <CodeEditor />; }
  }

  /**
   * Método repsonsável pela atualização do exercício atual dentre os demais
   * exercícios.
   * 
   * @param {object} exercise 
   */
  function updateExercise(exercise) {
    Util.updateItemIn(exercises, setExercises)(exercise);
  }

  return (
    <ExerciseContext.Provider value={[currentExercise, updateExercise]}>
      {getExercise()}
    </ExerciseContext.Provider>
  );
}

export default Exercise;