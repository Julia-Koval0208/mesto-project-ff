// создаю карточку, делаю копию контейнера и присваиваю все нужные значения
const cardTemplate = document.querySelector("#card-template").content; // переменная хранящая темплейт

//функция удаления карточек
export function deleteCard(cardElement) {
  cardElement.remove();
}
//функция для обработки лайка
export function likeCard(cardElement) {
  cardElement.classList.toggle("card__like-button_is-active"); // функция добавления лайка
}

// @todo: Функция создания карточки
export const createCard = (card, likeCard, deleteCard, wiewImage) => {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true); //копия блока с его содержимым
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link; // ссылка на картинку
  cardImage.alt = "На картинке изображено: " + card.name; // альт для каждой картинки
  cardElement.querySelector(".card__title").textContent = card.name; // тайтл

  // Обработчик клика для кнопки удаления
  const buttonCardDelete = cardElement.querySelector(".card__delete-button"); // кнопка удаления
  buttonCardDelete.addEventListener("click", () => {
    deleteCard(cardElement); // вызываем функцию удаления
  });

  const buttonLikeCard = cardElement.querySelector(".card__like-button");
  buttonLikeCard.addEventListener("click", (evt) => {
    likeCard(evt.target);
  });

  cardImage.addEventListener("click", () => {
    wiewImage(card);
  });

  return cardElement; // возврат новых значений
};
