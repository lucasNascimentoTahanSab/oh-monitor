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
import AnswerContext from '../../Context/AnswerContext/AnswerContext';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import Element from '../../../classes/strapi/Element.js';
import Validator from '../../../classes/util/Validator.js';
import Util from '../../../classes/util/Util.js';

function Exercises(props) {
  const [tabs, setTabs] = useContext(TabsContext);
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [elements, setElements] = useContext(ElementsContext);
  const [, setToastEvent] = useContext(ToastEventContext);
  const [answersByExercise, setAnswersByExercise] = useState(new Map());
  const [exercises, setExercises] = useState([]);
  const [currentElement, setCurrentElement] = useState(null);
  const [validator, setValidator] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { setValidator(new Validator(setToastEvent, setLoading)); }, []);

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

  function getButtonValue() {
    return currentTab?.solved ? 'Avançar' : 'Enviar';
  }

  function getButtonOnClick() {
    return currentTab?.solved ? goToNextTab : validateAnswers;
  }

  /**
   * Método responsável por validar respostas entregues pelo usuário.
   */
  function validateAnswers() {
    setLoading(true);
    setToastEvent(null);

    validator.validateAnswers(answersByExercise, exercises)
      ?.then(results => new Promise(resolve => resolve(Util.getResult(results))))
      .then(validateResult);
  }

  /**
   * Método responsável pela validação dos resultados obtidos em validação.
   * 
   * @param {array} result
   */
  function validateResult(result) {
    setValidation(result);
    setLoading(false);

    if (validator.validateResult(result)) {
      setCurrentTab({ ...currentTab, solved: true });
    }
  }

  function goToNextTab() {
    Util.goToNextItem(tabs, setTabs)(currentTab.uid);
  }

  return (
    <ExercisesContext.Provider value={[exercises, updateExercises]}>
      <AnswerContext.Provider value={[answersByExercise, setAnswersByExercise]}>
        <ValidationContext.Provider value={[validation, setValidation]}>
          <ol className='tcc-exercises'>
            {getExercises()}
          </ol>
          <div className='tcc-exercises__confirmation'>
            <ButtonConfirmation loading={loading} value={getButtonValue()} onClick={getButtonOnClick()} />
          </div>
        </ValidationContext.Provider>
      </AnswerContext.Provider>
    </ExercisesContext.Provider>
  );
}

export default Exercises;