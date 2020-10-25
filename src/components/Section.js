export class Section {
  constructor(sectionObject, containerSelector) {
    this._items = sectionObject.items;
    this._renderer = sectionObject.renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

    renderElements() {
      this._items.forEach((item) => {
        this._renderer(item);
      })
    }

    addItem(element) {
      this._containerSelector.prepend(element);
    }
}
