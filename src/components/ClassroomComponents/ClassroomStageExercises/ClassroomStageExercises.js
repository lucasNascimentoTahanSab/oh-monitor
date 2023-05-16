/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ClassroomStageExercise from '../ClassroomStageExercise/ClassroomStageExercise.js';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import callouts from '../../../classes/callouts/callout.js';

function ClassroomStageExercises() {
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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

  function onSend() {
    if (!exercises?.length) { return; }

    const chosenAnswers = getChosenAnswers();

    if (!chosenAnswers?.length) { return; }

    setLoading(true);
    send(chosenAnswers);
  }

  function send(chosenAnswers) {
    callouts.content.getCorrectAnswers(chosenAnswers).then(getResult).catch(getResult);
  }

  function getResult(result) {
    setResult(result);
    setLoading(false);
  }

  function getChosenAnswers() {
    return exercises.reduce(getChosenAnswer, []);
  }

  function getChosenAnswer(uuids, exercise) {
    const chosenAnswer = exercise.answers.find(answer => answer.current);

    if (chosenAnswer) { uuids.push(chosenAnswer.uuid); }

    return uuids;
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
          <ButtonConfirmation value='Enviar' onClick={onSend} loading={loading} />
        </div>
      </section>
    </ExercisesContext.Provider>
  );
}

export default ClassroomStageExercises;