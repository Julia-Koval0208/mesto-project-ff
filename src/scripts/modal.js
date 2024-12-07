import { fillFormWithProfileData } from "../index";

const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const profileButton = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки
export const newCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки

function addClass(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
}

export function removeClass(popup) {
  popup.classList.remove("popup_is-opened");
}

function handleEscKey(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened"); // Находим открытый попап
    if (openedPopup) {
      removeClass(openedPopup); // Передаем открытый попап в removeClass
    }
  }
}

export function wiewImage(cardImage) {
  const popupImage = document.querySelector(".popup_type_image");
  const imagePopup = popupImage.querySelector(".popup__image");
  const popupCartion = popupImage.querySelector(".popup__caption");

  imagePopup.src = cardImage.link;
  imagePopup.alt = cardImage.name;
  popupCartion.textContent = cardImage.name;

  addClass(popupImage);
}

// Обработчики событий для кнопок
editButton.addEventListener("click", () => {
  fillFormWithProfileData(); //заполнение полей
  addClass(popupEdit);
});

profileButton.addEventListener("click", () => addClass(newCard));
// обработчик событий для клавиатуры
document.addEventListener("keydown", handleEscKey);

// Обработчик для закрытия попапа по клику на кнопку закрытия
document.querySelectorAll(".popup").forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => removeClass(popup));

  // обработчик клика на оверлей
  popup.addEventListener("click", (evt) => {
    // Проверяем, был ли клик по самому оверлею (внешнему контейнеру попапа)
    if (evt.target === popup) {
      removeClass(popup);
    }
  });
});
