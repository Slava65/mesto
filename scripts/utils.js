export function escPopap(evt) {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  if (evt.key === "Escape") {
    popupList.forEach((popupOpened) => {
      if (popupOpened.classList.contains("popup_opened")) {
        openPopup(popupOpened);
      }
    });
  }
}

export function openPopup(selector) {
  if (!selector.classList.contains('popup_opened')) {
    document.addEventListener("keydown", escPopap);
    selector.classList.add('popup_opened');
  }
  else {
    document.removeEventListener("keydown", escPopap);
    selector.classList.remove('popup_opened');
  }
}

export function openImage(event, data) {
  const popupImage = document.querySelector('.popup_image');
  const bigImage = document.querySelector('.popup__big-image');
  const imageName = document.querySelector('.popup__image-name');
  const image = event.target.closest('.element__image');
  const point = event.target.parentElement.querySelector('.element__point').textContent;
  openPopup(popupImage);
  bigImage.src = image.src;
  bigImage.alt = `${point}`;
  imageName.textContent = point;
}
