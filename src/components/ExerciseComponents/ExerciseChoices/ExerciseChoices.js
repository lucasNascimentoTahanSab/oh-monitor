import React, { useContext, useEffect, useState } from 'react';
import ExerciseChoice from '../ExerciseChoice/ExerciseChoice.js';
import Util from '../../../classes/util/Util.js';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext.js';
import Exercise from '../../../classes/strapi/Exercise.js';

function ExerciseChoices(props) {
  const [currentExercise, setCurrentExercise] = useContext(ExerciseContext);
  const [choices, setChoices] = useState(null);

  useEffect(() => { setChoices(currentExercise?.choices); }, [currentExercise?.choices]);

  /**
   * Método responsável pela exibição das respostas para o exercício em questão.
   * 
   * @returns {array}
   */
  function getExerciseAnswers() {
    if (!choices?.length) { return null; }

    return choices.map((choice, index) =>
      <ExerciseChoice
        key={choice.uid}
        choice={choice}
        index={index}
        group={`${currentExercise.uid}-choices`}
        selectChoice={Util.setCurrentItem(choices, updateChoices)} />
    );
  }

  /**
   * Método responsável pela atualização das respostas em exercícios propostas.
   * 
   * @param {array} choices 
   */
  function updateChoices(choices) {
    const newCurrentExercise = new Exercise({ ...currentExercise, choices });

    setCurrentExercise(newCurrentExercise);
  }

  return (
    <li id={currentExercise?.uid} className='exercise__question-statement'>
      <span>{currentExercise?.statement}</span>
      <ul className='exercise__question-choices'>
        {getExerciseAnswers()}
      </ul>
    </li>
  );
}

export default ExerciseChoices;