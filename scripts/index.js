const cardTemplate = document.querySelector("#card-template").content; // переменная хранящая темплейт
const container = document.querySelector(".places__list"); // место куда добавляем

 //функция удаления карточек
function deleteCard(cardElement) {
  cardElement.remove();
}
// @todo: Функция создания карточки
// создаю карточку, делаю копию контейнера и присваиваю все нужные значения
const createCard = (card, deleteCard) => {
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

  return cardElement; // возврат новых значений
};

// @todo: Вывести карточки на страницу
const addCard = (cardElement, container) => {
  container.append(cardElement);
};

//функция чтобы пройтись по всему массиву
initialCards.forEach((card) => {
  const newCard = createCard(card, deleteCard); //переменная где лежит функция с карточкой
  addCard(newCard, container); // вызов функции создании карточки, 1 арг- карточки, 2-куда
});
