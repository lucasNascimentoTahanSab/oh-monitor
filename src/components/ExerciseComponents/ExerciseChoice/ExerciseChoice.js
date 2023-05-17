/**
 * @file Módulo responsável pela exibição da resposta ao exercício proposto em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';

function ExerciseChoice(props) {
  const [choice, setAnswer] = useState(null);

  useEffect(() => setAnswer(props.choice), [props.choice]);

  function getLetterClass() {
    return `no-select exercise__choice-letter ${choice?.current ? 'exercise__choice-letter--selected' : ''}`;
  }

  function getChecked() {
    return choice?.current ?? false;
  }

  return (
    <li id={choice?.uid} className='menu__item exercise__question-choice'>
      <input
        id={`${choice?.uid}-input`}
        className='menu__item-radio'
        type='radio'
        checked={getChecked()}
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