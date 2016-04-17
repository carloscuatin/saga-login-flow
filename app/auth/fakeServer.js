import {hashSync, genSaltSync, compareSync} from 'bcryptjs'

let users
let localStorage
let salt = genSaltSync(10)

if (global.process && process.env.NODE_ENV === 'test') {
  localStorage = require('localStorage')
} else {
  localStorage = global.window.localStorage
}

let server = {
  init () {
    if (localStorage.users === undefined || !localStorage.encrypted) {
      let juan = 'juan'
      let juanPass = hashSync('password', salt)

      users = {
        [juan]: juanPass
      }

      localStorage.users = JSON.stringify(users)
      localStorage.encrypted = true
    } else {
      users = JSON.parse(localStorage.users)
    }
  },
  login (username, password, callback) {
    let userExists = this.doesUserExist(username)

    if (userExists && compareSync(password, users[username])) {
      if (callback) {
        callback({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        })
      }
    } else {
      let error

      if (userExists) {
        error = {
          type: 'password-wrong'
        }
      } else {
        error = {
          type: 'user-doesnt-exist'
        }
      }

      if (callback) {
        callback({
          authenticated: false,
          error: error
        })
      }
    }
  },
  register (username, password, callback) {
    if (!this.doesUserExist(username)) {
      users[username] = hashSync(password, salt)
      localStorage.users = JSON.stringify(users)
      if (callback) {
        callback({
          registered: true
        })
      }
    } else {
      if (callback) {
        callback({
          registered: false,
          error: {
            type: 'username-exists'
          }
        })
      }
    }
  },
  logout (callback) {
    localStorage.removeItem('token')
    if (callback) callback()
  },
  doesUserExist (username) {
    return !(users[username] === undefined)
  }
}

server.init()

export default server
