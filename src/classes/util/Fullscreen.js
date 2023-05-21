import Util from "./Util";

/**
 * @file Módulo responsável por controlar abertura e fechamento de tela cheia.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Fullscreen {
  constructor(setFullscreen) {
    this.setFullscreen = setFullscreen;
  }

  _updateFullscreenOnEscBind = () => this._updateFullscreenOnEsc();

  /**
   * Método responsável por abertura de tela cheia.
   * 
   * @returns {Promise}
   */
  open(ref) {
    if (ref.requestFullscreen) { ref.requestFullscreen(); }
    else if (ref.mozRequestFullScreen) { this._openOnFirefox(ref); }
    else if (ref.webkitRequestFullscreen) { this._openOnChrome(ref); }
    else if (ref.msRequestFullscreen) { this._openOnIE(ref); }

    this._addEventListenerForEscClosing(ref);
  }

  /**
   * Método reponsável por atualizar estado da tela atual quando fechamento por ESC.
   * 
   * @param {object} ref 
   */
  _addEventListenerForEscClosing(ref) {
    ref.addEventListener('fullscreenchange', this._updateFullscreenOnEscBind);
    ref.addEventListener('mozfullscreenchange', this._updateFullscreenOnEscBind);
    ref.addEventListener('MSFullscreenChange', this._updateFullscreenOnEscBind);
    ref.addEventListener('webkitfullscreenchange', this._updateFullscreenOnEscBind);
  }

  _updateFullscreenOnEsc() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) { return; }

    Util.handle(this.setFullscreen, false);
  }

  /**
   * Método responsável por fechamento de tela cheia.
   * 
   * @returns {Promise}
   */
  close(ref) {
    if (document.fullscreenElement && document.exitFullscreen) { document.exitFullscreen(); }
    else if (document.fullscreenElement && document.mozCancelFullScreen) { this._closeOnFirefox(); }
    else if (document.fullscreenElement && document.webkitExitFullscreen) { this._closeOnChrome(); }
    else if (document.fullscreenElement && document.msExitFullscreen) { this._closeOnIE(); }

    this._removeEventListenerForEscClosing(ref);
  }

  /**
   * Método reponsável por remover listener para identificar fechamento por ESC quando
   * saindo de tela cheia.
   * 
   * @param {object} ref 
   */
  _removeEventListenerForEscClosing(ref) {
    ref.removeEventListener('fullscreenchange', this._updateFullscreenOnEscBind);
    ref.removeEventListener('mozfullscreenchange', this._updateFullscreenOnEscBind);
    ref.removeEventListener('MSFullscreenChange', this._updateFullscreenOnEscBind);
    ref.removeEventListener('webkitfullscreenchange', this._updateFullscreenOnEscBind);
  }

  /**
   * Método responsável por remover tela cheia em navegador IE e Edge.
   */
  _closeOnIE() {
    return document.msExitFullscreen();
  }

  /**
   * Método responsável por remover tela cheia em navegador Chrome, Safari 
   * e Opera.
   */
  _closeOnChrome() {
    return document.webkitExitFullscreen();
  }

  /**
   * Método responsável por remover tela cheia em navegador Firefox. 
   */
  _closeOnFirefox() {
    return document.mozCancelFullScreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador IE e Edge.
   * 
   * @param {object} ref 
   */
  _openOnIE(ref) {
    return ref.msRequestFullscreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador Chrome, Safari e Opera.
   * 
   * @param {object} ref 
   */
  _openOnChrome(ref) {
    return ref.webkitRequestFullscreen();
  }

  /**
   * Método responsável por requisitar tela cheia para componente em
   * navegador Firefox.
   * 
   * @param {object} ref 
   */
  _openOnFirefox(ref) {
    return ref.mozRequestFullScreen();
  }
}