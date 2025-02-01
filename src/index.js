import "./pages/index.css";

import { createCard, deleteCard, likeCard } from "./scripts/card";

import { openPopup, closePopup, setPopupListeners } from "./scripts/modal";

import { enableValidation, clearValidation } from "./scripts/validation";

import {
  fetchUserData,
  fetchCards,
  fetchEditProfile,
  fetchAddCards,
  fetchAvatarData,
} from "./scripts/api";

const container = document.querySelector(".places__list"); // место куда добавляем
const editButton = document.querySelector(".profile__edit-button"); // кнопка редактирования профиля
const popupEdit = document.querySelector(".popup_type_edit"); // попап редактирования профиля
const profileButton = document.querySelector(".profile__add-button"); // кнопка добавления новой карточки
const popupEditImage = document.querySelector(".profile__image"); //аватар-кнопка
//форма карточек
const newCardsForm = document.forms.new_place;
const namePlace = newCardsForm.elements.place_name;
const linkCard = newCardsForm.elements.link;
//форма профиля
const profileForm = document.forms.edit_profile;
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
// профиль редактирования
const nameElement = document.querySelector(".profile__title");
const jobElement = document.querySelector(".profile__description");
const newCard = document.querySelector(".popup_type_new-card"); // попап добавления новой карточки
//попап карточки
const popupImage = document.querySelector(".popup_type_image");
const imagePopup = popupImage.querySelector(".popup__image");
const popupCartion = popupImage.querySelector(".popup__caption");

const popupAvatar = document.querySelector(".popup_type_new-avatar"); //попап аватара

//форма смены аватара
const formAvatar = document.forms.new_avatar;
const inputAvatar = formAvatar.elements.new_avatar;

// @todo: Вывести карточки на страницу
const addCard = (cardElement, container) => {
  container.append(cardElement);
};

let userID = null;

const loadData = () => {
  Promise.all([fetchUserData(), fetchCards()])
    .then(([userData, cards]) => {
      userID = userData._id; // мое id
      nameElement.textContent = userData.name; // обновляем имя
      jobElement.textContent = userData.about; // обновляем описание

      const avatarImageUrl = userData.avatar; // Получаем URL аватара
      popupEditImage.style.backgroundImage = `url(${avatarImageUrl})`; // Устанавливаем аватар

      return cards; // возвращаем массив карточек
    })
    .then((cards) => {
      // используется новый массив из запроса к серверу
      cards.forEach((card) => {
        const newCard = createCard(
          card,
          userID,
          likeCard,
          deleteCard,
          wiewImage
        );
        addCard(newCard, container); // добавляем карточку в контейнер
      });
    })
    .catch((cards) =>
      console.log("Ошибка вывода карточек на страницу:", cards)
    );
};

loadData();

setPopupListeners(); // вызов функции обработчика клика по оверлею и эскейп

export function wiewImage(cardImage) {
  imagePopup.src = cardImage.link;
  imagePopup.alt = cardImage.name;
  popupCartion.textContent = cardImage.name;

  openPopup(popupImage);
}

function fillFormWithProfileData() {
  //заполняет поля формы значениями текущего имени и описания пользователя
  nameInput.value = nameElement.textContent; // Заполняем поле имени
  jobInput.value = jobElement.textContent; // Заполняем поле описания
}

popupEditImage.addEventListener("click", () => {
  openPopup(popupAvatar);
});

editButton.addEventListener("click", () => {
  fillFormWithProfileData(); //заполнение полей
  clearValidation(profileForm, config);
  openPopup(popupEdit);
});

// Обработчик «отправки» формы
function handleProfileButton(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  evt.submitter.textContent = "Сохранение...";

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  fetchEditProfile(nameValue, jobValue)
    .then((data) => {
      nameElement.textContent = data.name;
      jobElement.textContent = data.about;
      console.log("Профиль обновлен:", data);
      closePopup(popupEdit);
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileButton);

profileButton.addEventListener("click", () => {
  clearValidation(newCardsForm, config);
  openPopup(newCard);
});

// Обработчик «отправки» формы
function handleCardSubmit(evt) {
  evt.preventDefault(); // Сброс дефолтных настроек
  evt.submitter.textContent = "Сохранение...";

  const newCardData = {
    name: namePlace.value,
    link: linkCard.value,
  };

  fetchAddCards(newCardData.name, newCardData.link)
    .then((res) => {
      const newCards = createCard(res, userID, likeCard, deleteCard, wiewImage);
      container.prepend(newCards);
      closePopup(newCard);
      newCardsForm.reset();
      console.log(res);
    })
    .catch((error) => {
      console.error("Ошибка при добавлении новой карточки:", error);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
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

const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  evt.submitter.textContent = "Сохранение...";

  const avatarValue = inputAvatar.value;

  fetchAvatarData(avatarValue)
    .then((res) => {
      loadData();
      console.log("Замена аватара успешна:", res);

      closePopup(popupAvatar);
      formAvatar.reset();
    })
    .catch((er) => {
      console.log("Произошла ошибка в замене аватара:", er);
    })
    .finally(() => (evt.submitter.textContent = "Сохранить"));
};

formAvatar.addEventListener("submit", handleAvatarSubmit);

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

enableValidation(config);
