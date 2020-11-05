export class Section {
  constructor(renderer, containerSelector) {
    // this._items = sectionObject.items;
    this._renderer = renderer;
    this._containerSelector = document.querySelector(containerSelector);
  }

    renderElements(items) {
      items.forEach((item) => {
        this._renderer(item);
      })
    }

    addItem(element) {
      this._containerSelector.prepend(element);
    }

    // _saveItem(text) {
    //   this._api
    //     .addNewCard({name: text.name, link: text.link})
    //     .then((data) => this.addItem({data.name, data.link})

    //     )
    // }
}
