/**
 * @file Módulo responsável pela exibição dos exercícios da guia atual em sala de aula.
 * @copyright Lucas N. T. Sab 2023
 */
import React, { useContext, useEffect, useState } from 'react';
import Exercise from '../Exercise/Exercise.js';
import ButtonConfirmation from '../../ButtonComponents/ButtonConfirmation/ButtonConfirmation.js';
import UserContext from '../../Context/UserContext/UserContext.js';
import TabsContext from '../../Context/TabsContext/TabsContext.js';
import TabContext from '../../Context/TabContext/TabContext.js';
import ElementsContext from '../../Context/ElementsContext/ElementsContext.js';
import ExercisesContext from '../../Context/ExercisesContext/ExercisesContext.js';
import AnswerContext from '../../Context/AnswerContext/AnswerContext';
import ValidationContext from '../../Context/ValidationContext/ValidationContext.js';
import ToastEventContext from '../../Context/ToastEventContext/ToastEventContext.js';
import ModalEventContext from '../../Context/ModalEventContext/ModalEventContext.js';
import Element from '../../../classes/strapi/Element.js';
import callouts from '../../../classes/callouts/callout.js';
import calloutError from '../../../classes/callouts/calloutError.js';
import ShowModalConfirmationEvent from '../../../classes/util/ShowModal/ShowModalConfirmationEvent.js';
import Validator from '../../../classes/util/Validator.js';
import Util from '../../../classes/util/Util.js';

function Exercises(props) {
  const [user,] = useContext(UserContext);
  const [tabs, setTabs] = useContext(TabsContext);
  const [currentTab, setCurrentTab] = useContext(TabContext);
  const [elements, setElements] = useContext(ElementsContext);
  const [, setToastEvent] = useContext(ToastEventContext);
  const [, setModalEvent] = useContext(ModalEventContext);
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

  /**
   * Método responsável por determinar função do botão de envio, validando respostas, 
   * avançando guias ou concluindo sala de aula.
   * 
   * @returns {function}
   */
  function getButtonOnClick() {
    if (Util.getItemIndex(tabs, currentTab.uid) === tabs.length - 1) {
      return sendClassroom;
    }

    return currentTab?.solved ? () => updateUser(goToNextTab)(setLoading) : validateAnswers;
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

  /**
   * Método responsável pela exibição de modal de confirmação ao usuário tentar
   * concluir sala de aula.
   */
  function sendClassroom() {
    setModalEvent(new ShowModalConfirmationEvent({
      title: 'Tem certeza que deseja continuar?',
      message: 'Ao enviar os exercícios realizados, você será redirecionado para o formulário de feedback e não será possível rever os resultados. Tem certeza que deseja continuar?',
      action: updateUser(redirectUser)
    }));
  }

  /**
   * Método responsável pelo redirecionamento do usuário para formulário de feedback
   * após confirmação de envio.
   * 
   * @param {object} result 
   * @param {function} setLoading 
   * @returns 
   */
  function redirectUser(result, setLoading) {
    Util.handle(setLoading, false);

    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error) { return setToastEvent(calloutError.content(result.error)); }

    window.location.href = '/feedback';
  }

  /**
   * Método responsável pela atualização do usuário após confirmação de envio.
   * 
   * @param {function} then 
   */
  function updateUser(then) {
    return setLoading => {
      Util.handle(setLoading, true);

      callouts.content.updateMe(user)
        .then(result => updateUserResult(then, result, setLoading))
        .catch(error => setToastEvent(calloutError.content(error)));
    }
  }

  function updateUserResult(then, result, setLoading) {
    // Nem todos os erros ocorridos no servidor são recebidos em 'catch'.
    if (result?.error?.name === 'InternalServerError') { Util.redirectToSignIn(); }

    Util.handle(then, result, setLoading);
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