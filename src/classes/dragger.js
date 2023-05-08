export default class Dragger {
  constructor(screen, content) {
    this.screen = screen;
    this.content = content;
    this._childInitialX = null;
    this._childInitialY = null;
    this._mouseInitialX = null;
    this._mouseInitialY = null;
    this._deltaX = null;
    this._deltaY = null;
  }

  get x() { return this._childInitialX + this._deltaX; }
  get y() { return this._childInitialY + this._deltaY; }

  focus(element) {
    const screenBoundaries = this.screen.getBoundingClientRect();

    const screenCenterY = screenBoundaries.top + ((screenBoundaries.bottom - screenBoundaries.top) / 2);
    const screenCenterX = screenBoundaries.left + ((screenBoundaries.right - screenBoundaries.left) / 2);

    const elementBoundaries = element?.current?.getBoundingClientRect();

    const elementCenterY = elementBoundaries?.top + ((elementBoundaries?.bottom - elementBoundaries?.top) / 2);
    const elementCenterX = elementBoundaries?.left + ((elementBoundaries?.right - elementBoundaries?.left) / 2);

    this._updateChildPosition(elementCenterX - screenCenterX, elementCenterY - screenCenterY);
  }

  drag(event) {
    event.preventDefault();

    this._setChildInitialPosition();
    this._setMouseInitialPosition(event);

    this.screen.addEventListener('mousemove', this._handleScreenDraggerMouseMoveBind);
    this.screen.addEventListener('mouseup', this._handleScreenDraggerMouseUp.bind(this));
    this.screen.addEventListener('mouseleave', this._handleScreenDraggerMouseUp.bind(this));
  }

  _handleScreenDraggerMouseUp() {
    this.screen.removeEventListener('mousemove', this._handleScreenDraggerMouseMoveBind);
  }

  _handleScreenDraggerMouseMoveBind = (event) => { this._handleScreenDraggerMouseMove(event); }

  _handleScreenDraggerMouseMove(event) {
    event.preventDefault();

    this._deltaY = event.pageY - this._mouseInitialY;
    this._deltaX = event.pageX - this._mouseInitialX;

    this._updateChildPosition(this.x, this.y);
  }

  _updateChildPosition(x, y) {
    this.content.style.transform = `translate(${x}px,${y}px)`;
  }

  _setMouseInitialPosition(event) {
    this._mouseInitialX = event.pageX;
    this._mouseInitialY = event.pageY;
  }

  _setChildInitialPosition() {
    const translate = this.content.style.transform.includes('translate')
      ? this.content.style.transform.replace('translate', '').replace('(', '').replace(')', '')
      : '';
    const translateProperties = translate.includes(',') ? translate.split(',') : ['0px', '0px'];

    this._childInitialX = parseInt(translateProperties[0].replace('px', ''));
    this._childInitialY = parseInt(translateProperties[1].replace('px', ''));
  }
}