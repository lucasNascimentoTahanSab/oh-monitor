/**
 * @file Módulo responsável por controlar abertura e fechamento de tela cheia.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Fullscreen {
  /**
   * Método responsável por abertura de tela cheia.
   * 
   * @returns {Promise}
   */
  static open(ref) {
    if (ref.requestFullscreen) { return ref.requestFullscreen(); }
    if (ref.mozRequestFullScreen) { return Fullscreen._openOnFirefox(ref); }
    if (ref.webkitRequestFullscreen) { return Fullscreen._openOnChrome(); }
    if (ref.msRequestFullscreen) { return Fullscreen._openOnIE(); }
  }

  /**
   * Método responsável por fechamento de tela cheia.
   * 
   * @returns {Promise}
   */
  static close() {
    if (document.fullscreenElement && document.exitFullscreen) { return document.exitFullscreen(); }
    if (document.fullscreenElement && document.mozCancelFullScreen) { return Fullscreen._closeOnFirefox(); }
    if (document.fullscreenElement && document.webkitExitFullscreen) { return Fullscreen._closeOnChrome(); }
    if (document.fullscreenElement && document.msExitFullscreen) { return Fullscreen._closeOnIE(); }
  }

  /**
   * Método responsável por remover tela cheia em navegador IE e Edge.
   */
  static _closeOnIE() {
    return document.msExitFullscreen();
  }

  /**
   * Método responsável por remover tela cheia em navegador Chrome, Safari 
   * e Opera.
   */
  static _closeOnChrome() {
    return document.webkitExitFullscreen();
  }

  /**
   * Método responsável por remover tela cheia em navegador Firefox. 
   */
  static _closeOnFirefox() {
    return document.mozCancelFullScreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador IE e Edge.
   * 
   * @param {object} ref 
   */
  static _openOnIE(ref) {
    return ref.msRequestFullscreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador Chrome, Safari e Opera.
   * 
   * @param {object} ref 
   */
  static _openOnChrome(ref) {
    return ref.webkitRequestFullscreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador Firefox.
   * 
   * @param {object} ref 
   */
  static _openOnFirefox(ref) {
    return ref.mozRequestFullScreen();
  }
}