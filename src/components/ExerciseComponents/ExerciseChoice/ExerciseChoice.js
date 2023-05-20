/**
 * @file Módulo responsável pela exibição da resposta ao exercício proposto em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';
import Util from '../../../classes/util/Util.js';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext.js';

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

  function getLetterClass() {
    return `no-select exercise__choice-letter ${getLetterAditionalStyling()}`;
  }

  function getLetterAditionalStyling() {
    if (choice?.wrong) { return 'exercise__choice-letter--wrong'; }
    if (choice?.correct) { return 'exercise__choice-letter--correct'; }
    if (choice?.current) { return 'exercise__choice-letter--selected'; }

    return '';
  }

  function getChecked() {
    return choice?.current ?? false;
  }

  function getDisabled() {
    return Boolean(Util.getCorrectItem(currentExercise?.choices));
  }

  return (
    <li id={choice?.uid} className='tcc-menu-item exercise__question-choice'>
      <input
        id={`${choice?.uid}-input`}
        className='tcc-menu-item__radio'
        type='radio'
        checked={getChecked()}
        disabled={getDisabled()}
        name={props.group}
        onChange={() => Util.handle(props.selectChoice, choice.uid)}
      >
      </input>
      <label className='exercise__choice-text' htmlFor={`${choice?.uid}-input`}>
        <span className={getLetterClass()}>{Util.getLetterByIndex(props.index)}</span>
        {choice?.statement}
      </label>
    </li>
  );
}

export default ExerciseChoice;