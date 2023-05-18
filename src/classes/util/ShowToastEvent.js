/**
 * @file Módulo responsável por controlar/configurar exibição de modal toast.
 * @copyright Lucas N. T. Sab 2023 
 */
import Util from "./Util";

export default class ShowToastEvent {
  constructor(title, message, variant) {
    this.title = title ?? null;
    this.message = message ?? null;
    this.variant = variant ?? null;
    this._timer = null;
  }

  /**
   * Método responsável pela exibição do toast ao usuário, configurando fechamento
   * para mais 6500 milissegundos.
   * 
   * @param {function} setToastEvent 
   * @param {function} setShowToastEvent 
   */
  show(setToastEvent, setShowToastEvent) {
    Util.handle(setShowToastEvent, true);

    this._timer = setTimeout(() => {
      this.unmountToastEvent(setToastEvent, setShowToastEvent)
    }, 6500);
  }

  /**
   * Método responsável pelo fechamento do toast, por decisão do usuário ou tempo
   * limite de exibição atingido.
   * 
   * @param {function} setToastEvent 
   * @param {function} setShowToastEvent 
   */
  unmountToastEvent(setToastEvent, setShowToastEvent) {
    Util.handle(setShowToastEvent, false);
    Util.handle(setToastEvent, null);

    clearTimeout(this._timer);
  }
}