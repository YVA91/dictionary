const movieurl = 'https://api.nomoreparties.co/beatfilm-movies'

const report = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getCreateMovies = () => {
  return fetch(`${movieurl}`)
    .then(report)
}