/**
 * @file Módulo responsável pela exibição do exercício em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import ExerciseChoices from '../ExerciseChoices/ExerciseChoices.js';
import CodeEditor from '../../CodeComponents/CodeEditor/CodeEditor.js';

function Exercise(props) {
  const [exercise, setExercise] = useState(null);

  useEffect(() => { setExercise(props.exercise) }, [props.exercise]);

  function getExercise() {
    if (exercise?.type === 'choice') { return <ExerciseChoices exercise={exercise} />; }
    if (exercise?.type === 'code') { return <CodeEditor exercise={exercise} />; }
  }

  return (<>{getExercise()}</>);
}

export default Exercise;