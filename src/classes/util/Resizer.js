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
    this._contentInitialPosition = null;
    this._contentInitialHeight = null;
    this._contentInitialWidth = null;
    this._mouseInitialYPosition = null;
    this._mouseInitialXPosition = null;
  }

  toggleResizer() {
    this._DIRECTION[this.direction](this).toggleResizer();
  }

  resize(event) {
    this._DIRECTION[this.direction](this).resize(event);
  }

  _DIRECTION = {
    'horizontal': (resizer) => {
      /**
       * Método responsável por controlar abertura parcial e fechamento do elemento.
       */
      function toggleResizer() {
        if (_isOpen()) { _close(); }
        else { _open(); }
      }

      function _close() {
        resizer.current.style.width = '0px';
      }

      /**
       * Método responsável pela abertura do elemento até a metade da altura do container.
       * O desconto aplicado ao tamanho final se dá por conta de possíveis elementos
       * associados que não sofram redimensionamento.
       */
      function _open() {
        resizer.current.style.width = `${(resizer._parentWidth * .5) - resizer.discount}px`;
      }

      function _isOpen() {
        if (!resizer.current.style.width) { return false; }

        const currentWidth = parseInt(resizer.current.style.width.replace('px', ''));

        return currentWidth > 0;
      }

      /**
       * Método responsável por reajustar propoções e posição de objeto recebido em
       * cena.
       * 
       * @param {object} event 
       */
      function resize(event) {
        event.preventDefault();

        resizer._setParentWidth();
        resizer._setContentPosition();
        resizer._setContentInitialWidth();
        resizer._setMouseInitialXPosition(event);

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

        const newWidth = resizer._contentInitialWidth - (event.pageX - resizer._mouseInitialXPosition);

        if (newWidth > (resizer._parentWidth - resizer.discount)) { return; }
        if (newWidth < 0) { return; }

        resizer.current.style.width = `${newWidth}px`;
        resizer.current.style.left = `${resizer._contentInitialPosition + (event.pageX - resizer._mouseInitialXPosition)}px`;
      }

      return { toggleResizer, resize };
    },
    'vertical': resizer => {
      /**
       * Método responsável por controlar abertura parcial e fechamento do elemento.
       */
      function toggleResizer() {
        if (_isOpen()) { _close(); }
        else { _open(); }
      }

      function _close() {
        resizer.current.style.height = '0px';
      }

      /**
       * Método responsável pela abertura do elemento até a metade da altura do container.
       * O desconto aplicado ao tamanho final se dá por conta de possíveis elementos
       * associados que não sofram redimensionamento.
       */
      function _open() {
        resizer.current.style.height = `${(resizer._parentHeight * .5) - resizer.discount}px`;
      }

      function _isOpen() {
        if (!resizer.current.style.height) { return false; }

        const currentHeight = parseInt(resizer.current.style.height.replace('px', ''));

        return currentHeight > 0;
      }

      /**
       * Método responsável por reajustar propoções e posição de objeto recebido em
       * cena.
       * 
       * @param {object} event 
       */
      function resize(event) {
        event.preventDefault();

        resizer._setParentHeight();
        resizer._setContentPosition();
        resizer._setContentInitialHeight();
        resizer._setMouseInitialYPosition(event);

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
        resizer.current.style.top = `${resizer._contentInitialPosition + (event.pageY - resizer._mouseInitialYPosition)}px`;
      }

      return { toggleResizer, resize };
    }
  };

  _setMouseInitialYPosition(event) {
    this._mouseInitialYPosition = event.pageY;
  }

  _setMouseInitialXPosition(event) {
    this._mouseInitialXPosition = event.pageX;
  }

  _setContentInitialWidth() {
    this._contentInitialWidth = this.current?.offsetWidth;
  }

  _setContentInitialHeight() {
    this._contentInitialHeight = this.current?.offsetHeight;
  }

  _setContentPosition() {
    const contentBoundaries = this.current?.getBoundingClientRect();

    this._contentInitialPosition = contentBoundaries.top;
  }

  _setParentWidth() {
    const parentBoundaries = this.parent?.getBoundingClientRect();

    this._parentWidth = parentBoundaries.width;
  }

  _setParentHeight() {
    const parentBoundaries = this.parent?.getBoundingClientRect();

    this._parentHeight = parentBoundaries.height;
  }
}