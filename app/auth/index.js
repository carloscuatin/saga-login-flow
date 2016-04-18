import request from './fakeRequest'

let localStorage

if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

let auth = {
  login (username, password) {
    if (this.loggedIn()) return Promise.resolve(true)

    return request.post('/login', {username, password})
      .then(response => {
        localStorage.token = response.token
        return Promise.resolve(true)
      })
  },
  logOut () {
    return request.post('/logout')
  },
  loggedIn () {
    return !!localStorage.token
  },
  register (username, password, callback) {
    let self = this

    return request.post('/register', {username, password})
      .then(() => self.login(username, password))
  },
  onChange () {}
}

export default auth
