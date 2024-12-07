import "./pages/index.css";

import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, likeCard } from "./scripts/card";

import { wiewImage, removeClass, newCard } from "./scripts/modal";

const container = document.querySelector(".places__list"); // место куда добавляем

// @todo: Вывести карточки на страницу
const addCard = (cardElement, container) => {
  container.append(cardElement);
};

//функция чтобы пройтись по всему массиву
initialCards.forEach((card) => {
  const newCard = createCard(card, likeCard, deleteCard, wiewImage); //переменная где лежит функция с карточкой
  addCard(newCard, container); // вызов функции создании карточки, 1 арг- карточки, 2-куда
});

// Находим форму
const formElement = document.forms.edit_profile;

// Находим поля формы
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");

export function fillFormWithProfileData() {
  nameInput.value = nameElement.textContent; // Заполняем поле имени
  jobInput.value = jobElement.textContent; // Заполняем поле описания
}

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // Вставьте новые значения с помощью textContent
  nameElement.textContent = nameValue;
  jobElement.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const formElementCard = document.forms.new_place;
const namePlace = formElementCard.elements.place_name;
const linkCard = formElementCard.elements.link;

// Обработчик «отправки» формы
function handleCardSubmit(
  evt,
  formElementCard,
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
  removeClass(newCard);

  // Сброс формы
  formElementCard.reset();
}

// Добавляем обработчик события submit и передаем необходимые аргументы
formElementCard.addEventListener("submit", (evt) =>
  handleCardSubmit(
    evt,
    formElementCard,
    container,
    createCard,
    deleteCard,
    wiewImage,
    likeCard
  )
);
