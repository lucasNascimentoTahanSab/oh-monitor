import React from 'react';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation';
import ClassroomStageExercise from '../ClassroomStageExercise/ClassroomStageExercise';

function ClassroomStageExercises(props) {
  function getExercises() {
    if (!Array.isArray(props.exercises)) { return null; }

    return props.exercises.map(exercise => <ClassroomStageExercise key={exercise.attributes?.uuid} exercise={exercise} />);
  }

  return (
    <section className='classroom__content'>
      <h2>Exercícios</h2>
      <div>
        <ol className='exercise__questions'>
          {getExercises()}
        </ol>
      </div>
      <div className='exercise__confirmation'>
        <ButtonConfirmation value='Enviar' />
      </div>
    </section>
  );
}

export default ClassroomStageExercises;