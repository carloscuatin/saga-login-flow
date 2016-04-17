import request from './fakeRequest'

let localStorage

if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

let auth = {
  login (username, password, callback) {
    if (this.loggedIn()) {
      callback(true)
      return
    }

    request.post('/login', {username, password}, (response) => {
      if (response.authenticated) {
        localStorage.token = response.token
        callback(true)
      } else {
        callback(false, response.error)
      }
    })
  },
  logOut (callback) {
    request.post('/logout', {}, () => {
      callback(true)
    })
  },
  loggedIn () {
    return !!localStorage.token
  },
  register (username, password, callback) {
    request.post('/register', {username, password}, (response) => {
      if (response.registered) {
        this.login(username, password, callback)
      } else {
        callback(false, response.error)
      }
    })
  },
  onChange () {}
}

export default auth
