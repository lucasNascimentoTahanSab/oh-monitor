import React, { useContext } from 'react';
import ExerciseContext from '../../Context/ExerciseContext/ExerciseContext';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation';
import ClassroomStageExercise from '../ClassroomStageExercise/ClassroomStageExercise';

function ClassroomStageExercises(props) {
  const [exercises,] = useContext(ExerciseContext);

  function getExercises() {
    if (!exercises?.length) { return null; }

    return exercises.map(exercise => <ClassroomStageExercise key={exercise.uuid} exercise={exercise} />);
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