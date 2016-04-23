import request from './fakeRequest'

let localStorage

if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

let auth = {
  login (username, password) {
    if (auth.loggedIn()) return Promise.resolve(true)

    return request.post('/login', {username, password})
      .then(response => {
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  },
  logout () {
    return request.post('/logout')
  },
  loggedIn () {
    return !!localStorage.token
  },
  register (username, password) {
    return request.post('/register', {username, password})
      .then(() => auth.login(username, password))
  },
  onChange () {}
}

export default auth
