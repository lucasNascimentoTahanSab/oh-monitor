/**
 * @file Módulo responsável pela exibição da resposta ao exercício proposto em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useEffect, useState } from 'react';
import Util from '../../../classes/util/Util.js';

function ClassroomStageExerciseAnswer(props) {
  const [answer, setAnswer] = useState(null);

  useEffect(() => setAnswer(props.answer), [props.answer]);

  function getLetterClass() {
    return `no-select exercise__answer-letter ${answer?.current ? 'exercise__answer-letter--selected' : ''}`;
  }

  return (
    <li id={answer?.uuid} className='menu__item exercise__question-answer'>
      <input
        id={`${answer?.uuid}-input`}
        className='menu__item-radio'
        type='radio'
        name={props.group}
        onClick={() => Util.handle(props.selectAnswer, answer.uuid)}
      >
      </input>
      <label className='exercise__answer-text' htmlFor={`${answer?.uuid}-input`}>
        <span className={getLetterClass()}>{Util.getLetterByIndex(props.index)}</span>
        {answer?.statement}
      </label>
    </li>
  );
}

export default ClassroomStageExerciseAnswer;