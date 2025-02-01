const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-31",
  headers: {
    authorization: "77631a48-9728-4c45-a993-b9b6adfc3678",
    "Content-Type": "application/json",
  },
};

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`); //Проверка статуса ответа
  }
  return res.json(); /*Если ответ успешный (res.ok равно true), данные преобразуются в JSON и возвращаются.

  Если ответ неудачный (res.ok равно false), выбрасывается ошибка, и управление передается в блок catch*/
};


const fetchApi = (url, method = "GET", body = null) => {
  const options = {
    method,
    headers: config.headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options).then(handleResponse)
};

export const fetchUserData = () => fetchApi(`${config.baseUrl}/users/me`);

export const fetchCards = () => fetchApi(`${config.baseUrl}/cards`);

export const fetchEditProfile = (name, about) => {
  return fetchApi(`${config.baseUrl}/users/me`, "PATCH", { name, about });
};

export const fetchAddCards = (name, link) => {
  return fetchApi(`${config.baseUrl}/cards`, "POST", { name, link });
};

export const fetchDeleteCard = (cardId) => {
  return fetchApi(`${config.baseUrl}/cards/${cardId}`, "DELETE");
};

export const fetchAddlike = (cardId) => {
  return fetchApi(`${config.baseUrl}/cards/likes/${cardId}`, "PUT");
};

export const fetchDeletelike = (cardId) => {
  return fetchApi(`${config.baseUrl}/cards/likes/${cardId}`, "DELETE");
};

export const fetchAvatarData = (avatar) => {
  return fetchApi(`${config.baseUrl}/users/me/avatar`, "PATCH", { avatar });
};
