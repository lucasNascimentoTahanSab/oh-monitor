import React from 'react';

function ExerciseAnswer(props) {
  function onAnswerClick() {
    if (typeof props?.selectAnswer !== 'function') { return; }

    props.selectAnswer(props.answer?.attributes?.letter);
  }

  function getLetterClass() {
    return `no-select exercise__answer-letter ${props?.selected ? 'exercise__answer-letter--selected' : ''}`;
  }

  return (
    <li className='exercise__question-answer'>
      <div className='exercise__answer' onClick={onAnswerClick}>
        <button className={getLetterClass()}>{props.answer?.attributes?.letter}</button>
        <p className='exercise__answer-text'>{props.answer?.attributes?.statement}</p>
      </div>
    </li>
  );
}

export default ExerciseAnswer;