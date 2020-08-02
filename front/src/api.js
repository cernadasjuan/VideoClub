const BASE_URL = 'http://localhost:3005/api'

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const randomNumber = (min = 0, max = 1) =>
  Math.floor(Math.random() * (max - min + 1)) + min
const simulateNetworkLatency = (min = 30, max = 1500) =>
  delay(randomNumber(min, max))

async function callApi(endpoint, options = {}) {
  
  await simulateNetworkLatency()

  options.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  const url = BASE_URL + endpoint
  const response = await fetch(url, options)
  const data = await response.json()

  return data
}

const api = {
  film: {
    list() {
      return callApi('/film')
    },
    get(filmId) {
      return callApi(`/film/${filmId}`)
    },
    create(newFilm) {
      return callApi('/film', {
        method: 'POST',
        body: JSON.stringify(newFilm),
      })
    },
    edit(filmId, modifiedFilm) {
      return callApi(`/film/${filmId}`, {
        method: 'PUT',
        body: JSON.stringify(modifiedFilm),
      })
    },
    edit(filmId) {
      return callApi(`/film/${filmId}`, {
        method: 'DELETE'
      })
    }
  },
  user: {
    login(inputUser) {
      return callApi('/user/login', {
        method: 'POST',
        body: JSON.stringify(inputUser),
      })
    },
    register(filmId) {
      return callApi('/user/register')
    }
  }
}

export default api
