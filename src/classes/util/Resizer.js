/**
 * @file Módulo responsável por reajustar dimensões/posição de item em cena.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Resizer {
  constructor(current) {
    this.current = current;
    this._contentInitialHeight = null;
    this._contentInitialPosition = null;
    this._mouseInitialPosition = null;
  }

  /**
   * Método responsável por reajustar propoções e posição de objeto recebido em
   * cena.
   * 
   * @param {object} event 
   */
  resize(event) {
    event.preventDefault();

    this._setContentPosition();
    this._setContentInitialHeight();
    this._setContentMousePosition(event);

    window.addEventListener('mousemove', this._handleResizerMouseMoveBind);
    window.addEventListener('mouseup', this._handleResizerMouseUp.bind(this));
  }

  _handleResizerMouseUp() {
    window.removeEventListener('mousemove', this._handleResizerMouseMoveBind);
  }

  _handleResizerMouseMoveBind = event => this._handleResizerMouseMove(event);

  /**
   * Método responsável por atualizar dimensões e posições de objeto em cena de 
   * acordo com movimentação.
   * 
   * @param {object} event 
   */
  _handleResizerMouseMove(event) {
    event.preventDefault();

    this.current.style.height = `${this._contentInitialHeight - (event.pageY - this._mouseInitialPosition)}px`;
    this.current.style.top = `${this._contentInitialPosition + (event.pageY - this._mouseInitialPosition)}px`;
  }

  _setContentMousePosition(event) {
    this._mouseInitialPosition = event.pageY;
  }

  _setContentInitialHeight() {
    this._contentInitialHeight = this.current?.offsetHeight;
  }

  _setContentPosition() {
    const contentBoundaries = this.current?.getBoundingClientRect();

    this._contentInitialPosition = contentBoundaries.top;
  }
}