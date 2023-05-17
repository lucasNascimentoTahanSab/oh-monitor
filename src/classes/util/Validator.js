import callouts from "../callouts/callout";

export default class Validator {
  /**
   * Construtor recebe funções para exibição de erros, sucesso ou loading
   * durante ou após validação.
   * 
   * @param {function} showError 
   * @param {function} showSuccess 
   * @param {function} showLoading 
   */
  constructor(showError, showSuccess, showLoading) {
    this.showError = showError ?? function () { };
    this.showSuccess = showSuccess ?? function () { };
    this.showLoading = showLoading ?? function () { };
  }

  /**
   * Método responsável por validar respostas do usuário.
   * 
   * @param {object} result 
   * @returns {object}
   */
  async validate(result) {
    if (!result?.keys()) { return null; }

    this.showLoading(true);

    const validation = (await this._getAnswersForResult(result));

    this.showLoading(false);

    return validation;
  }

  /**
   * Método responsável pela montagem das respostas, separadas pelo UID de
   * cada atividade avaliada.
   * 
   * @param {object} result 
   * @returns {object}
   */
  async _getAnswersForResult(result) {
    const validation = {};
    const resultKeys = Array.from(result.keys());

    for (const key of resultKeys) {
      validation[key] = await this._calloutForResult(key, result.get(key));
    }

    return validation;
  }

  async _calloutForResult(exerciseUid, answer) {
    return await callouts.content.getExerciseAnswer(exerciseUid, answer);
  }
}