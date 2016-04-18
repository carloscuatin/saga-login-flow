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
  login (username, password) {
    let userExists = this.doesUserExist(username)

    return new Promise((resolve, reject) => {
      if (userExists && compareSync(password, users[username])) {
        resolve({
          authenticated: true,
          token: Math.random().toString(36).substring(7)
        })
      } else {
        let error

        if (userExists) {
          error = new Error('password-wrong')
        } else {
          error = new Error('user-doesnt-exist')
        }

        reject(error)
      }
    })
  },
  register (username, password) {
    return new Promise((resolve, reject) => {
      if (!this.doesUserExist(username)) {
        users[username] = hashSync(password, salt)
        localStorage.users = JSON.stringify(users)

        resolve({registered: true})
      } else {
        reject(new Error('username-exists'))
      }
    })
  },
  logOut () {
    return new Promise(resolve => {
      localStorage.removeItem('token')
      resolve()
    })
  },
  doesUserExist (username) {
    return !(users[username] === undefined)
  }
}

server.init()

export default server
