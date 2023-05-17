/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import Exercise from '../Exercise/Exercise.js';
import Util from '../../../classes/util/Util.js';
import Element from '../../../classes/strapi/Element.js';
// import callouts from '../../../classes/callouts/callout.js';

function Exercises(props) {
  const [elements, setElements] = useContext(ElementsContext);
  const [currentElement, setCurrentElement] = useState(null);
  const [exercises, setExercises] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [result, setResult] = useState(null);

  useEffect(() => {
    setCurrentElement(props.element);
    setExercises(props.element?.exercises);
  }, [props.element]);

  /**
   * Método responsável pela obtenção dos exercícios a serem exibidos na guia atual.
   * 
   * @returns {array}
   */
  function getExercises() {
    if (!exercises?.length) { return null; }

    return exercises.map(exercise => <Exercise key={exercise.uid} exercise={exercise} />);
  }

  /**
   * Método repsonsável por atualizar elemento dentre demais elementos da seção atual.
   * 
   * @param {object} element 
   */
  function updateCurrentElement(element) {
    Util.updateItemIn(elements, setElements)(element);
  }

  /**
   * Método responsável pela atualização dos exercícios assim como sua representação 
   * no elemento atual.
   * 
   * @param {array} exercises 
   */
  function updateExercises(exercises) {
    const newCurrentElement = new Element({ ...currentElement, exercises });

    updateCurrentElement(newCurrentElement);
  }

  // function onSend() {
  //   if (!exercises?.length) { return; }

  //   const chosenAnswers = getChosenAnswers();

  //   if (!chosenAnswers?.length) { return; }

  //   setLoading(true);
  //   send(chosenAnswers);
  // }

  // function send(chosenAnswers) {
  //   callouts.content.getCorrectAnswers(chosenAnswers).then(getResult).catch(getResult);
  // }

  // function getResult(result) {
  //   setResult(result);
  //   setLoading(false);
  // }

  // function getChosenAnswers() {
  //   return exercises.reduce(getChosenAnswer, []);
  // }

  // function getChosenAnswer(uids, exercise) {
  //   const chosenAnswer = exercise.answers.find(answer => answer.current);

  //   if (chosenAnswer) { uids.push(chosenAnswer.uid); }

  //   return uids;
  // }

  return (
    <ExercisesContext.Provider value={[exercises, updateExercises]}>
      <ol className='exercise__questions'>
        {getExercises()}
      </ol>
      <div className='exercise__confirmation'>
        <ButtonConfirmation value='Enviar' />
      </div>
    </ExercisesContext.Provider >
  );
}

export default Exercises;