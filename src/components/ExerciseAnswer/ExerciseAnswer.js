import React from 'react';

function ExerciseAnswer(props) {
  return (
    <div className='exercise__answer'>
      <button className='exercise__answer-letter'>{props.letter}</button>
      <p className='exercise__answer-text'>{props.answer}</p>
    </div>
  );
}

export default ExerciseAnswer;