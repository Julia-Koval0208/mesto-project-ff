const popupImage = document.querySelector(".popup_type_image");
const imagePopup = popupImage.querySelector(".popup__image");
const popupCartion = popupImage.querySelector(".popup__caption");

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

export function wiewImage(cardImage) {
  imagePopup.src = cardImage.link;
  imagePopup.alt = cardImage.name;
  popupCartion.textContent = cardImage.name;

  openPopup(popupImage);
}

// Обработчик для закрытия попапа по клику на кнопку закрытия
document.querySelectorAll(".popup").forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(popup));

  // обработчик клика на оверлей
  popup.addEventListener("click", (evt) => {
    // Проверяем, был ли клик по самому оверлею (внешнему контейнеру попапа)
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});
