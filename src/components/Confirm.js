import { Popup } from "./Popup.js";

export class Confirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setEventListeners() {
    this._popupSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
    });
    this._popupSelector
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });
    this._popupSelector.addEventListener("click", (evt) =>
      this._handleOverlayClose(evt)
    );
  }

  setSubmitCallback(callback) {
    this._handleSubmitCallback = callback;
  }
}
