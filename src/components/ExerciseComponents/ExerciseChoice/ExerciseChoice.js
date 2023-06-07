/**
 * @file Módulo responsável pela exibição da resposta ao exercício proposto em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ButtonChoice from '../../ButtonComponents/ButtonChoice/ButtonChoice.js';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext.js';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';
import Util from '../../../classes/util/Util.js';

function ExerciseChoice(props) {
  const [currentExercise,] = useContext(ExerciseContext);
  const [validation,] = useContext(ValidationContext);
  const [choice, setAnswer] = useState(null);

  useEffect(() => setAnswer(props.choice), [props.choice]);

  /**
   * Método responsável por atualizar status da opção atual (correta ou errada) para
   * alterações em exibição.
   */
  useEffect(() => {
    if (!choice?.current) { return; }

    choice.wrong = validation ? (validation[currentExercise.uid] ? !validation[currentExercise.uid].correct : false) : choice.wrong;
    choice.correct = validation ? (validation[currentExercise.uid] ? validation[currentExercise.uid].correct : false) : choice.correct;

    Util.handle(props.updateChoice, choice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation]);

  function getDisabled() {
    return Boolean(Util.getCorrectItem(currentExercise?.choices));
  }

  return (
    <li id={choice?.uid} className='tcc-exercise-choice tcc-exercise-choice__statement'>
      <ButtonChoice index={props.index} state={choice} disabled={getDisabled()} onClick={() => Util.handle(props.selectChoice, choice.uid)} />
      <span>{choice?.statement}</span>
    </li>
  );
}

export default ExerciseChoice;