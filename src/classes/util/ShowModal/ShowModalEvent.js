/**
 * @file Módulo responsável por controlar/configurar exibição de modal.
 * @copyright Lucas N. T. Sab 2023 
 */
import Util from "../Util";

export default class ShowModalEvent {
  constructor(modal) {
    this.title = modal?.title ?? null;
    this.message = modal?.message ?? null;
    this.variant = modal?.variant ?? null;
  }

  /**
   * Método responsável pelo fechamento do modal.
   * 
   * @param {function} setModalEvent 
   * @param {function} setShowModalEvent 
   */
  unmountModalEvent(setModalEvent, setShowModalEvent) {
    Util.handle(setShowModalEvent, false);
    Util.handle(setModalEvent, null);
  }
}