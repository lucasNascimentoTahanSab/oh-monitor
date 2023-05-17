import React, { useEffect, useState } from 'react';
import ExerciseChoice from '../ExerciseChoice/ExerciseChoice.js';
import Util from '../../../classes/util/Util.js';

function ExerciseChoices(props) {
  const [exercises, setExercises] = useState(null);
  const [exercise, setElement] = useState(null);
  const [choices, setChoices] = useState(null);

  useEffect(() => {
    setElement(props.exercise);
    setChoices(props.exercise?.choices);
  }, [props.exercise]);

  /**
   * Método responsável pela exibição das respostas para o exercício em questão.
   * 
   * @returns {array}
   */
  function getExerciseAnswers() {
    if (!exercise?.choices?.length) { return null; }

    return exercise.choices.map((choice, index) =>
      <ExerciseChoice
        key={choice.uid}
        choice={choice}
        index={index}
        group={`${exercise.uid}-choices`}
        selectChoice={Util.setCurrentItem(choices, updateChoices)} />
    );
  }

  /**
   * Método responsável pela atualização das respostas em exercícios propostas.
   * 
   * @param {array} choices 
   */
  function updateChoices(choices) {
    Util.updateItemIn(exercises, setExercises)({ ...exercise, choices });
  }

  return (
    <li id={exercise?.uid} className='exercise__question-statement'>
      <span>{exercise?.statement}</span>
      <ul className='exercise__question-choices'>
        {getExerciseAnswers()}
      </ul>
    </li>
  );
}

export default ExerciseChoices;