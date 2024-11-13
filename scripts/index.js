  const cardTemplate = document.querySelector("#card-template").content; // переменная хранящая темплейт
  const container = document.querySelector(".places__list"); // место куда добавляем

// @todo: Функция создания карточки
  const createCard = (card) => { // создаю карточку, делаю копию контейнера и присваиваю все нужные значения
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true); //копия блока с его содержимым
  cardElement.querySelector(".card__image").src = card.link; // ссылка на картинку
  cardElement.querySelector(".card__image").alt = "На картинке изображено:" + card.name; // альт для каждой картинки
  cardElement.querySelector(".card__title").textContent = card.name; // тайтл
// обработчик клика для кнопки удаления
  const deleteButton = cardElement.querySelector(".card__delete-button"); // кнопка удаления
  deleteButton.addEventListener("click", () => {
  removeButton(cardElement); // вызываем функцию удаления
});

  return cardElement; // возврат новых значений
};
  
// @todo: Вывести карточки на страницу
  const addCard = (cardElement, container) => { //функция для вывода карточки в контейнер
  container.append(cardElement);
}

  initialCards.forEach((card) => { //функция чтобы пройтись по всему массиву
  const newCard = createCard(card); //переменная где лежит функция с карточкой
  addCard(newCard, container) // вызов функции создании карточки, 1 арг- карточки, 2-куда
});
// @todo: Функция удаления карточки
  function removeButton(cardElement) { //функция удаления карточек
  cardElement.remove();
};
 

 

 

 