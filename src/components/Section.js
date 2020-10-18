export class Section {
  constructor(sectionObject, containerSelector) {
    this._items = sectionObject.items;
    this._renderer = sectionObject.renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

    drowingElement() {
      this._items.forEach((item) => {
        const cardElement = this._renderer(item);
      })
    }

    addItem(element) {
      this._containerSelector.prepend(element);
    }
}
