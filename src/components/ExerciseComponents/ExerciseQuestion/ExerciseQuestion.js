import React, { useContext, useEffect, useState } from 'react';
import ExerciseChoice from '../ExerciseChoice/ExerciseChoice.js';
import Util from '../../../classes/util/Util.js';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext.js';
import Exercise from '../../../classes/strapi/Exercise.js';
import AnswerContext from '../../Context/AnswerContext/AnswerContext.js';

function ExerciseQuestion() {
  const [currentExercise, setCurrentExercise] = useContext(ExerciseContext);
  const [answersByExercise, setAnswersByExercise] = useContext(AnswerContext);
  const [choices, setChoices] = useState(null);

  useEffect(() => {
    setChoices(currentExercise?.choices);
    updateResultByExercise(currentExercise?.choices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExercise?.choices]);

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
        selectChoice={Util.setCurrentItem(choices, updateChoices)}
        updateChoice={Util.updateItemIn(choices, updateChoices)}
      />
    );
  }

  /**
   * Método responsável pela atualização das respostas em exercícios propostas.
   * 
   * @param {array} choices 
   */
  function updateChoices(choices) {
    const newCurrentExercise = new Exercise({ ...currentExercise, choices });

    updateResultByExercise(choices);

    setCurrentExercise(newCurrentExercise);
  }

  /**
   * Método responsável por atualizar resultados (no caso a resposta escolhida para 
   * o problema) por exercício para posterior avaliação.
   * 
   * @param {array} choices 
   */
  function updateResultByExercise(choices) {
    const currentChoice = Util.getCurrentItem(choices)?.uid;

    if (!currentChoice) { return; }

    answersByExercise.set(currentExercise.uid, currentChoice);

    setAnswersByExercise(new Map(answersByExercise));
  }

  return (
    <li id={currentExercise?.uid} className='tcc-exercise-question'>
      <span>{currentExercise?.statement}</span>
      <ul className='tcc-exercise-question__choices'>
        {getExerciseAnswers()}
      </ul>
    </li>
  );
}

export default ExerciseQuestion;