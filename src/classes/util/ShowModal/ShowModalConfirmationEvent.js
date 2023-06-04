/**
 * @file Módulo responsável por controlar/configurar exibição de modal de confirmação.
 * @copyright Lucas N. T. Sab 2023 
 */
import Util from "../Util";
import ShowModalEvent from "./ShowModalEvent";

export default class ShowModalConfirmationEvent extends ShowModalEvent {
  constructor(modal) {
    super(modal);

    this.action = modal?.action ?? function () { };
  }

  /**
   * Método responsável pela exibição do toast ao usuário, configurando fechamento
   * para mais 6500 milissegundos.
   * 
   * @param {function} setModalConfirmationEvent 
   * @param {function} setShowModalConfirmationEvent 
   */
  show(setModalConfirmationEvent, setShowModalConfirmationEvent) {
    Util.handle(setShowModalConfirmationEvent, true);
  }
}