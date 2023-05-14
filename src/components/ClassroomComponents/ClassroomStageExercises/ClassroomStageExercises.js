/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomStageExercise from '../ClassroomStageExercise/ClassroomStageExercise';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation';
import TabContext from '../../Context/TabContext/TabContext';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext';

function ClassroomStageExercises(props) {
  const [exercises, setExercises] = useState([]);
  const [currentTab, setCurrentTab] = useContext(TabContext);

  useEffect(() => setExercises(currentTab?.exercises), [currentTab]);

  /**
   * Método responsável pela obtenção dos exercícios a serem exibidos na guia atual.
   * 
   * @returns {array}
   */
  function getExercises() {
    if (!exercises?.length) { return null; }

    return exercises.map(exercise => <ClassroomStageExercise key={exercise.uuid} exercise={exercise} />);
  }

  /**
   * Método responsável pela atualização dos exercícios na guia atual.
   * 
   * @param {array} exercises 
   */
  function updateExercises(exercises) {
    setExercises(exercises);
    setCurrentTab({ ...currentTab, exercises });
  }

  return (
    <ExercisesContext.Provider value={[exercises, updateExercises]}>
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
    </ExercisesContext.Provider>
  );
}

export default ClassroomStageExercises;