import ShowToastEvent from "./ShowToastEvent";
import callouts from "../callouts/callout";
import Util from "./Util";

export default class Validator {
  constructor(setToastEvent, setLoading) {
    this._setToastEvent = setToastEvent ?? function () { };
    this._setLoading = setLoading ?? function () { };
  }

  /**
   * Método responsável por validar respostas do usuário.
   * 
   * @param {object} answers 
   * @param {object} questions 
   * @returns {object}
   */
  validateAnswers(answers, questions) {
    if (!this._check(answers, questions)) {
      this._setLoading(false);

      return null;
    }

    return this._getAnswersForResult(answers);
  }

  /**
   * Método responsável pela montagem das respostas, separadas pelo UID de
   * cada atividade avaliada.
   * 
   * @param {object} answers 
   * @returns {object}
   */
  _getAnswersForResult(answers) {
    return Promise.all(Array.from(answers.keys()).map(key => this._calloutForResult(key, answers.get(key))));
  }

  _calloutForResult(exerciseUid, answer) {
    return callouts.content.getExerciseAnswer(exerciseUid, answer);
  }

  /**
   * Método responsável por conferências iniciais em respostas antes de enviá-las
   * para validação.
   * 
   * @param {Map} answers 
   * @param {array} questions 
   * @returns {boolean}
   */
  _check(answers, questions) {
    if (this._checkForLength(answers, questions)) { return false; }
    if (this._checkForBlank(answers)) { return false; }

    return true;
  }

  /**
   * Método responsável por verificar se existem respostas em branco antes de 
   * enviá-las para validação.
   * 
   * @param {array} answers 
   * @returns {boolean}
   */
  _checkForBlank(answers) {
    if (!Util.isThereBlankItems(Array.from(answers.values()))) { return false; }

    this._showInfoForBlank();

    return true;
  }

  /**
   * Método responsável por conferir se todas as perguntas foram respondidas antes
   * de enviá-las para validação.
   * 
   * @param {Map} answers 
   * @param {array} questions 
   * @returns {boolean}
   */
  _checkForLength(answers, questions) {
    if (answers?.size === questions?.length) { return false; }

    this._showInfoForLength();

    return true;
  }

  /**
   * Método responsável por conferir resultado após validações.
   * 
   * @param {object} result 
   * @returns 
   */
  validateResult(result) {
    if (this._checkForErrors(result)) { return false; }

    this._showSuccessMessage();

    return true;
  }

  /**
   * Método responsável por conferir se haviam respostas incorretas dentre
   * as respostas validadas.
   * 
   * @param {object} result 
   * @returns {boolean}
   */
  _checkForErrors(result) {
    if (!Util.isThereErrors(result)) { return false; }

    this._showErrorForWrongAnswers();

    return true;
  }

  _showErrorForWrongAnswers() {
    this._setToastEvent(new ShowToastEvent(
      'Ops...',
      'Revise suas respostas e tente novamente!',
      'error'
    ));
  }

  _showInfoForBlank() {
    this._setToastEvent(new ShowToastEvent(
      'Não está se esquecendo de nada?',
      'O resultado entregue está incompleto, utilize a animação de apoio para garantir que não falta nada.',
      'info'
    ));
  }

  _showInfoForLength() {
    this._setToastEvent(new ShowToastEvent(
      'Não está se esquecendo de nada?',
      'Responda as atividades restantes antes de enviar suas respostas!',
      'info'
    ));
  }

  _showSuccessMessage() {
    this._setToastEvent(new ShowToastEvent(
      'Sucesso!',
      'Você acertou em cheio e já pode avançar para a próxima seção!',
      'success'
    ));
  }
}