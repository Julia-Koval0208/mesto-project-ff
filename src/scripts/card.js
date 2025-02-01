import { fetchDeleteCard, fetchAddlike, fetchDeletelike } from "./api";
// создаю карточку, делаю копию контейнера и присваиваю все нужные значения
const cardTemplate = document.querySelector("#card-template").content; // переменная хранящая темплейт

//функция удаления карточек
export function deleteCard(cardElement, cardId) {
  fetchDeleteCard(cardId)
    .then(() => {
      cardElement.remove(); // Удаляем элемент после успешного запроса
    })
    .catch((err) => console.error("Ошибка при удалении карточки:", err));
}

export function likeCard(cardElement, card, likeCount) {
  if (!cardElement.classList.contains("card__like-button_is-active")) {
    fetchAddlike(card._id)
      .then((res) => {
        cardElement.classList.add("card__like-button_is-active");
        likeCount.textContent = res.likes.length; // обновляем количество лайков
      })
      .catch((err) => console.log("Ошибка поставновки лайка:", err));
  } else {
    fetchDeletelike(card._id)
      .then((res) => {
        console.log(res);
        cardElement.classList.remove("card__like-button_is-active");
        likeCount.textContent = res.likes.length; // обновляем количество лайков
      })
      .catch((err) => console.log("Ошибка удаления лайка:", err));
  }
}

// @todo: Функция создания карточки
export const createCard = (card, userID, likeCard, deleteCard, wiewImage) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); //копия блока с его содержимым
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link; // ссылка на картинку
  cardImage.alt = "На картинке изображено: " + card.name; // альт для каждой картинки
  cardElement.querySelector(".card__title").textContent = card.name; // тайтл

  // Обработчик клика для кнопки удаления

  const buttonCardDelete = cardElement.querySelector(".card__delete-button"); // кнопка удаления
  buttonCardDelete.addEventListener("click", (evt) => {
    evt.stopPropagation();
    deleteCard(cardElement, card._id); // вызываем функцию удаления
  });
  // Проверка существования данных карточки
  if (card && card.owner && card.owner._id) {
    if (userID === card.owner._id) {
      buttonCardDelete.style.display = "block";
    } else {
      buttonCardDelete.style.display = "none";
    }
  }

  // Обработчик клика для кнопки лайка
  const buttonLikeCard = cardElement.querySelector(".card__like-button");
  buttonLikeCard.addEventListener("click", (evt) => {
    likeCard(evt.target, card, likeCount); // Вызываем функцию обработки лайка
  });

  const likeCount = cardElement.querySelector(".card__like-counter");
  if (Array.isArray(card.likes) && card.likes.length > 0) {
    likeCount.textContent = card.likes.length; // Если есть лайки, отображаем их количество
    buttonLikeCard.classList.toggle(
      "card__like-button_is-active",
      card.likes.some((like) => like._id === userID)
    ); //Отображаем лайки
  } else {
    likeCount.textContent = 0; // Если лайков нет, устанавливаем 0
  }

  cardImage.addEventListener("click", () => {
    wiewImage(card);
  });

  return cardElement; // возврат новых значений
};
