import Util from "./Util";

export default class ShowToastEvent {
  constructor(title, message, variant) {
    this.title = title ?? null;
    this.message = message ?? null;
    this.variant = variant ?? null;
    this._timer = null;
  }

  show(setToastEvent, setShowToastEvent) {
    Util.handle(setShowToastEvent, true);

    this._timer = setTimeout(() => {
      this.unmountToastEvent(setToastEvent, setShowToastEvent)
    }, 6500);
  }

  unmountToastEvent(setToastEvent, setShowToastEvent) {
    Util.handle(setShowToastEvent, false);
    Util.handle(setToastEvent, null);

    clearTimeout(this._timer);
  }
}