import React from 'react';

function ClassroomStageExerciseAnswer(props) {
  function onAnswerClick() {
    if (typeof props?.selectAnswer !== 'function') { return; }

    props.selectAnswer(getLetterByIndex(props.index));
  }

  function getLetterClass() {
    return `no-select exercise__answer-letter ${props?.selected ? 'exercise__answer-letter--selected' : ''}`;
  }

  function getLetterByIndex(index) {
    if (typeof index !== 'number') { return String.fromCharCode(65); }

    return String.fromCharCode(index + 65);
  }

  return (
    <li id={props.answer?.attributes?.uuid} className='exercise__question-answer'>
      <div className='exercise__answer' onClick={onAnswerClick}>
        <button className={getLetterClass()}>{getLetterByIndex(props.index)}</button>
        <p className='exercise__answer-text'>{props.answer?.attributes?.statement}</p>
      </div>
    </li>
  );
}

export default ClassroomStageExerciseAnswer;