/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import ResultContext from '../../Context/ResultContext/ResultContext';
import Element from '../../../classes/strapi/Element.js';
import Exercise from '../Exercise/Exercise.js';
import Validator from '../../../classes/util/Validator.js';
import Util from '../../../classes/util/Util.js';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';

function Exercises(props) {
  const [elements, setElements] = useContext(ElementsContext);
  const [resultByExercise, setResultByExercise] = useState(new Map());
  const [exercises, setExercises] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [validator, setValidator] = useState(null);
  const [validation, setValidation] = useState(null);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    setValidator(new Validator(setShowError, setShowSuccess, setShowLoading));
  }, []);

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

  /**
   * Método responsável por validar respostas entregues pelo usuário.
   */
  async function validateResult() {
    setValidation(await validator.validate(resultByExercise));
  }

  return (
    <ExercisesContext.Provider value={[exercises, updateExercises]}>
      <ResultContext.Provider value={[resultByExercise, setResultByExercise]}>
        <ValidationContext.Provider value={[validation, setValidation]}>
          <ol className='exercise__questions'>
            {getExercises()}
          </ol>
          <div className='exercise__confirmation'>
            <ButtonConfirmation value='Enviar' loading={showLoading} onClick={validateResult} />
          </div>
        </ValidationContext.Provider>
      </ResultContext.Provider >
    </ExercisesContext.Provider >
  );
}

export default Exercises;