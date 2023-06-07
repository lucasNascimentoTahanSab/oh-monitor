/**
 * @file Módulo responsável por reajustar dimensões/posição de item em cena.
 * @copyright Lucas N. T. Sab 2023
 */
export default class Resizer {
  constructor(current, parent, discount, direction = 'vertical') {
    this.current = current;
    this.parent = parent;
    this.discount = discount ?? 0;
    this.direction = direction;
    this._parentHeight = null;
    this._parentWidth = null;
    this._contentInitialHeight = null;
    this._contentInitialWidth = null;
    this._contentInitialTopPosition = null;
    this._contentInitialRightPosition = null;
    this._mouseInitialYPosition = null;
    this._mouseInitialXPosition = null;

    window.addEventListener('resize', () => this._DIRECTION[this.direction](this).adjust());
  }

  toggleResizer(event) {
    if (event && event?.type !== 'click') { return; }

    this._DIRECTION[this.direction](this).toggleResizer();
  }

  resize(event) {
    if (event?.type !== 'mousedown') { return; }

    this._DIRECTION[this.direction](this).resize(event);
  }

  _DIRECTION = {
    'horizontal': (resizer) => {
      /**
       * Método responsável por ajustar dimensões do elemento a partir do redimensionamento
       * do elemento pai.
       */
      function adjust() {
        if (_isHalfOpen()) { _adjustHalfOpen(); }
        if (_isFullOpen()) { _adjustFullOpen(); }
        else { _adjustOther(); }
      }

      function _adjustOther() {
        const growthRate = _getGrowthRate();

        _adjustWidth(growthRate);
        _adjustRight(growthRate);
      }

      function _adjustRight(growthRate) {
        if (!resizer.current.style.right) { return; }

        resizer.current.style.right = `${Math.round(parseInt(resizer.current.style.right.replace('px')) * growthRate)}px`;
      }

      function _adjustWidth(growthRate) {
        if (!resizer.current.style.width) { return; }

        resizer.current.style.width = `${Math.round(parseInt(resizer.current.style.width.replace('px')) * growthRate)}px`;
      }

      function _getGrowthRate() {
        const oldParentWidth = resizer._parentWidth;

        resizer._setParentSizing();

        return resizer._parentWidth / oldParentWidth;
      }

      function _adjustFullOpen() {
        resizer._setParentSizing();

        _fullOpen();
      }

      function _isFullOpen() {
        if (!resizer.current.style.width) { return true; }

        return resizer.current.style.width === `${Math.round(resizer._parentWidth - resizer.discount)}px`;
      }

      function _adjustHalfOpen() {
        resizer._setParentSizing();

        _halfOpen();
      }

      function _isHalfOpen() {
        return resizer.current.style.width === `${Math.round((resizer._parentWidth * .5) - (resizer.discount / 2))}px`;
      }

      /**
       * Método responsável por controlar abertura parcial ou total do elemento.
       */
      function toggleResizer() {
        resizer._setParentSizing();

        if (_isFullOpen()) { _halfOpen(); }
        else { _fullOpen(); }
      }

      function _halfOpen() {
        resizer.current.style.width = `${Math.round((resizer._parentWidth * .5) - (resizer.discount / 2))}px`;
      }

      function _fullOpen() {
        resizer.current.style.width = `${Math.round(resizer._parentWidth - resizer.discount)}px`;
      }

      /**
       * Método responsável por reajustar propoções e posição de objeto recebido em
       * cena.
       * 
       * @param {object} event 
       */
      function resize(event) {
        event.preventDefault();

        resizer._setParentSizing();
        resizer._setContentInitialPosition();
        resizer._setContentInitialSizing();
        resizer._setMouseInitialPosition(event);

        window.addEventListener('mousemove', _handleResizerMouseMoveBind);
        window.addEventListener('mouseup', _handleResizerMouseUp);
      }

      function _handleResizerMouseUp() {
        window.removeEventListener('mousemove', _handleResizerMouseMoveBind);
      }

      const _handleResizerMouseMoveBind = event => _handleResizerMouseMove(event);

      /**
       * Método responsável por atualizar dimensões e posições de objeto em cena de 
       * acordo com movimentação. O desconto aplicado ao tamanho final se dá por conta 
       * de possíveis elementos associados que não sofram redimensionamento.
       * 
       * @param {object} event 
       */
      function _handleResizerMouseMove(event) {
        event.preventDefault();

        const newWidth = resizer._contentInitialWidth + (event.pageX - resizer._mouseInitialXPosition);

        if (newWidth > (resizer._parentWidth - resizer.discount)) { return; }
        if (newWidth < 0) { return; }

        resizer.current.style.width = `${newWidth}px`;
        resizer.current.style.right = `${resizer._contentInitialRightPosition + (event.pageX - resizer._mouseInitialXPosition)}px`;
      }

      return { adjust, toggleResizer, resize };
    },
    'vertical': resizer => {
      /**
       * Método responsável por ajustar dimensões do elemento a partir do redimensionamento
       * do elemento pai.
       */
      function adjust() {
        const growthRate = _getGrowthRate();

        _adjustHeight(growthRate);
        _adjustTop(growthRate);
      }

      function _adjustTop(growthRate) {
        if (!resizer.current.style.top) { return; }

        resizer.current.style.top = `${Math.round(parseInt(resizer.current.style.top.replace('px')) * growthRate)}px`;
      }

      function _adjustHeight(growthRate) {
        if (!resizer.current.style.height) { return; }

        resizer.current.style.height = `${Math.round(parseInt(resizer.current.style.height.replace('px')) * growthRate)}px`;
      }

      function _getGrowthRate() {
        const oldParentHeight = resizer._parentHeight;

        resizer._setParentSizing();

        return resizer._parentHeight / oldParentHeight;
      }

      /**
       * Método responsável por controlar abertura parcial e fechamento do elemento.
       */
      function toggleResizer() {
        resizer._setParentSizing();

        if (_isFullOpen()) { _close(); }
        else { _fullOpen(); }
      }

      function _close() {
        resizer.current.style.height = '0px';
      }

      /**
       * Método responsável pela abertura do elemento até a metade da altura do container.
       * O desconto aplicado ao tamanho final se dá por conta de possíveis elementos
       * associados que não sofram redimensionamento.
       */
      function _fullOpen() {
        resizer.current.style.height = `${Math.round(resizer._parentHeight - resizer.discount)}px`;
      }

      function _isFullOpen() {
        if (!resizer.current.style.height) { return false; }

        return resizer.current.style.height === `${Math.round(resizer._parentHeight - resizer.discount)}px`;
      }

      /**
       * Método responsável por reajustar propoções e posição de objeto recebido em
       * cena.
       * 
       * @param {object} event 
       */
      function resize(event) {
        event.preventDefault();

        resizer._setParentSizing();
        resizer._setContentInitialPosition();
        resizer._setContentInitialSizing();
        resizer._setMouseInitialPosition(event);

        window.addEventListener('mousemove', _handleResizerMouseMoveBind);
        window.addEventListener('mouseup', _handleResizerMouseUp);
      }

      function _handleResizerMouseUp() {
        window.removeEventListener('mousemove', _handleResizerMouseMoveBind);
      }

      const _handleResizerMouseMoveBind = event => _handleResizerMouseMove(event);

      /**
       * Método responsável por atualizar dimensões e posições de objeto em cena de 
       * acordo com movimentação. O desconto aplicado ao tamanho final se dá por conta 
       * de possíveis elementos associados que não sofram redimensionamento.
       * 
       * @param {object} event 
       */
      function _handleResizerMouseMove(event) {
        event.preventDefault();

        const newHeight = resizer._contentInitialHeight - (event.pageY - resizer._mouseInitialYPosition);

        if (newHeight > (resizer._parentHeight - resizer.discount)) { return; }
        if (newHeight < 0) { return; }

        resizer.current.style.height = `${newHeight}px`;
        resizer.current.style.top = `${resizer._contentInitialTopPosition + (event.pageY - resizer._mouseInitialYPosition)}px`;
      }

      return { adjust, toggleResizer, resize };
    }
  };

  _setMouseInitialPosition(event) {
    this._mouseInitialYPosition = event.pageY;
    this._mouseInitialXPosition = event.pageX;
  }

  _setContentInitialSizing() {
    this._contentInitialWidth = this.current?.offsetWidth;
    this._contentInitialHeight = this.current?.offsetHeight;
  }

  _setContentInitialPosition() {
    const contentBoundaries = this.current?.getBoundingClientRect();

    this._contentInitialTopPosition = contentBoundaries.top;
    this._contentInitialRightPosition = contentBoundaries.right;
  }

  _setParentSizing() {
    const parentBoundaries = this.parent?.getBoundingClientRect();

    this._parentWidth = parentBoundaries.width;
    this._parentHeight = parentBoundaries.height;
  }
}