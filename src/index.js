import "./pages/index.css";

import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, likeCard } from "./scripts/card";

import { openPopup, closePopup, setPopupListeners } from "./scripts/modal";

const container = document.querySelector(".places__list"); // место куда добавляем
const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const profileButton = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки
//форма карточек
const newCardsForm = document.forms.new_place;
const namePlace = newCardsForm.elements.place_name;
const linkCard = newCardsForm.elements.link;
//форма профиля
const profileForm = document.forms.edit_profile;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const newCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки

const popupImage = document.querySelector(".popup_type_image");
const imagePopup = popupImage.querySelector(".popup__image");
const popupCartion = popupImage.querySelector(".popup__caption");

// @todo: Вывести карточки на страницу
const addCard = (cardElement, container) => {
  container.append(cardElement);
};

//функция чтобы пройтись по всему массиву
initialCards.forEach((card) => {
  const newCard = createCard(card, likeCard, deleteCard, wiewImage); //переменная где лежит функция с карточкой
  addCard(newCard, container); // вызов функции создании карточки, 1 арг- карточки, 2-куда
});

setPopupListeners();

export function wiewImage(cardImage) {
  imagePopup.src = cardImage.link;
  imagePopup.alt = cardImage.name;
  popupCartion.textContent = cardImage.name;

  openPopup(popupImage);
}

function fillFormWithProfileData() {
  nameInput.value = nameElement.textContent; // Заполняем поле имени
  jobInput.value = jobElement.textContent; // Заполняем поле описания
}

editButton.addEventListener("click", () => {
  fillFormWithProfileData(); //заполнение полей
  openPopup(popupEdit);
});

// Обработчик «отправки» формы
function handleProfileButton(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;

  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileButton);

profileButton.addEventListener("click", () => openPopup(newCard));

// Обработчик «отправки» формы
function handleCardSubmit(
  evt,
  newCardsForm,
  container,
  createCard,
  deleteCard,
  wiewImage,
  likeCard
) {
  evt.preventDefault(); //сброс дефолтных настроек

  // Создание новой карточки
  const newCardData = {
    name: namePlace.value,
    link: linkCard.value,
  };

  const newCards = createCard(newCardData, likeCard, deleteCard, wiewImage);

  //добавление в начало контейнера
  container.prepend(newCards);

  // закрытие попапа
  closePopup(newCard);

  // Сброс формы
  newCardsForm.reset();
}

// Добавляем обработчик события submit и передаем необходимые аргументы
newCardsForm.addEventListener("submit", (evt) =>
  handleCardSubmit(
    evt,
    newCardsForm,
    container,
    createCard,
    deleteCard,
    wiewImage,
    likeCard
  )
);
