/**
 * @file Módulo responsável por possibilitar movimentação em tela por meio de arrasta e solta.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Dragger {
  constructor(screen, content) {
    this.screen = screen;
    this.content = content;
    this.element = null;
    this._elementCenterX = null;
    this._elementCenterY = null;
    this._screenCenterX = null;
    this._screenCenterY = null;
    this._childInitialX = null;
    this._childInitialY = null;
    this._mouseInitialX = null;
    this._mouseInitialY = null;
    this._deltaX = null;
    this._deltaY = null;
  }

  get x() { return this._childInitialX + this._deltaX; }
  get y() { return this._childInitialY + this._deltaY; }

  /**
   * Método responsável por foco em elemento recebido, deslocando a tela para posicioná-lo
   * ao centro.
   * 
   * @param {object} element 
   */
  focus(element) {
    this.element = element;

    this._setContentInitialPosition();
    this._setScreenCenter();
    this._setElementCenter();

    this._deltaX = Math.floor(this._screenCenterX - this._elementCenterX);
    this._deltaY = Math.floor(this._screenCenterY - this._elementCenterY);

    this._updateContentPosition(this.x, this.y);
  }

  /**
   * Método responsável por calcular ponto central do elemento para direcioná-lo ao centro
   * da tela.
   */
  _setElementCenter() {
    const elementBoundaries = this.element.getBoundingClientRect();

    this._elementCenterX = elementBoundaries.left + ((elementBoundaries.right - elementBoundaries.left) / 2);
    this._elementCenterY = elementBoundaries.top + ((elementBoundaries.bottom - elementBoundaries.top) / 2);
  }

  /**
   * Método responsável por calcular ponto central da tela para onde direcionar o elemento.
   */
  _setScreenCenter() {
    const screenBoundaries = this.screen.getBoundingClientRect();

    this._screenCenterX = screenBoundaries.left + ((screenBoundaries.right - screenBoundaries.left) / 2);
    this._screenCenterY = screenBoundaries.top + ((screenBoundaries.bottom - screenBoundaries.top) / 2);
  }

  /**
   * Método responsável por movimentar a tela por meio de arrasta e solta.
   * 
   * @param {object} event 
   */
  drag(event) {
    event.preventDefault();

    this._setContentInitialPosition();
    this._setMouseInitialPosition(event);

    this.screen.addEventListener('mousemove', this._handleScreenDraggerMouseMoveBind);
    this.screen.addEventListener('mouseup', this._handleScreenDraggerMouseUp.bind(this));
    this.screen.addEventListener('mouseleave', this._handleScreenDraggerMouseUp.bind(this));
  }

  _handleScreenDraggerMouseUp() {
    this.screen.removeEventListener('mousemove', this._handleScreenDraggerMouseMoveBind);
  }

  _handleScreenDraggerMouseMoveBind = event => this._handleScreenDraggerMouseMove(event); s

  /**
   * Método responsável por atualizar posição da tela de acordo com deslocamento do mouse.
   * 
   * @param {object} event 
   */
  _handleScreenDraggerMouseMove(event) {
    event.preventDefault();

    this._deltaY = event.pageY - this._mouseInitialY;
    this._deltaX = event.pageX - this._mouseInitialX;

    this._updateContentPosition(this.x, this.y);
  }

  _updateContentPosition(x, y) {
    this.content.style.transform = `translate(${x}px,${y}px)`;
  }

  _setMouseInitialPosition(event) {
    this._mouseInitialX = event.pageX;
    this._mouseInitialY = event.pageY;
  }

  _setContentInitialPosition() {
    const translate = this.content.style.transform.includes('translate')
      ? this.content.style.transform.replace('translate', '').replace('(', '').replace(')', '')
      : '';
    const translateProperties = translate.includes(',') ? translate.split(',') : ['0px', '0px'];

    this._childInitialX = parseInt(translateProperties[0].replace('px', ''));
    this._childInitialY = parseInt(translateProperties[1].replace('px', ''));
  }
}