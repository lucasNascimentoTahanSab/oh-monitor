import React from 'react';
import { util } from '../../../classes/util';

function ClassroomStageExerciseAnswer(props) {
  function onAnswerClick() {
    if (typeof props?.selectAnswer !== 'function') { return; }

    props.selectAnswer(props.answer?.uuid);
  }

  function getLetterClass() {
    return `no-select exercise__answer-letter ${props.answer?.selected ? 'exercise__answer-letter--selected' : ''}`;
  }

  return (
    <li id={props.answer?.uuid} className='exercise__question-answer'>
      <div className='exercise__answer' onClick={onAnswerClick}>
        <button className={getLetterClass()}>{util.getLetterByIndex(props.index)}</button>
        <p className='exercise__answer-text'>{props.answer?.statement}</p>
      </div>
    </li>
  );
}

export default ClassroomStageExerciseAnswer;