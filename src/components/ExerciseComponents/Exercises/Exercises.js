/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import Exercise from '../Exercise/Exercise.js';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import ResultContext from '../../Context/ResultContext/ResultContext';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import Element from '../../../classes/strapi/Element.js';
import Validator from '../../../classes/util/Validator.js';
import ShowToastEvent from '../../../classes/util/ShowToastEvent.js';
import Util from '../../../classes/util/Util.js';

function Exercises(props) {
  const [tabs, setTabs] = useContext(TabsContext);
  const [currentTab,] = useContext(TabContext);
  const [elements, setElements] = useContext(ElementsContext);
  const [, setToastEvent] = useContext(ToastEventContext);
  const [resultByExercise, setResultByExercise] = useState(new Map());
  const [exercises, setExercises] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [validator, setValidator] = useState(null);
  const [validation, setValidation] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [next, setNext] = useState(false);

  useEffect(() => { setValidator(new Validator(setShowLoading)); }, []);

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
    if (resultByExercise.size < exercises.length) {
      return setToastEvent(new ShowToastEvent(
        'Não está se esquecendo de nada?',
        'Responda as atividades restantes antes de enviar suas respostas!',
        'info'
      ));
    }
    if (resultsAreBlank()) {
      return setToastEvent(new ShowToastEvent(
        'Não está se esquecendo de nada?',
        'O resultado entregue está incompleto, utilize a animação de apoio para garantir que não falta nada.',
        'info'
      ));
    }

    const response = await validator.validate(resultByExercise);

    setValidation(response);
    validateResponse(response);
  }

  function validateResponse(response) {
    const wrongAnswers = getWrongAnswers(response);

    if (wrongAnswers.length > 0) {
      setToastEvent(new ShowToastEvent('Ops...', 'Revise suas respostas e tente novamente!', 'error'));
    } else {
      setToastEvent(new ShowToastEvent('Sucesso!', 'Você acertou em cheio e já pode avançar para a próxima seção!', 'success'));
      setNext(true);
    }
  }

  function getWrongAnswers(response) {
    if (typeof response !== 'object') { return 0; }

    return Object.keys(response).filter(key => !response[key].correct);
  }

  function resultsAreBlank() {
    if (!resultByExercise?.size) { return true; }

    return Array.from(resultByExercise.values()).filter(value => !value).length > 0;
  }

  function goToNextTab() {
    Util.goToNextItem(tabs, setTabs)(currentTab.uid);
  }

  return (
    <ExercisesContext.Provider value={[exercises, updateExercises]}>
      <ResultContext.Provider value={[resultByExercise, setResultByExercise]}>
        <ValidationContext.Provider value={[validation, setValidation]}>
          <ol className='exercise__questions'>
            {getExercises()}
          </ol>
          <div className='exercise__confirmation'>
            <ButtonConfirmation value={next ? 'Avançar' : 'Enviar'} loading={showLoading} onClick={next ? goToNextTab : validateResult} />
          </div>
        </ValidationContext.Provider>
      </ResultContext.Provider >
    </ExercisesContext.Provider >
  );
}

export default Exercises;