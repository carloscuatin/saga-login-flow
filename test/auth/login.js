import test from 'ava'
import auth from '../../app/auth'

test('returns true on correct login', t => {
  auth.login('juan', 'password')
    .then(response => {
      t.true(response)
    })
})

test('returns error on wrong password', t => {
  t.throws(auth.login('juan', 'wrong'), 'password-wrong')
})

test('returns error on wrong password', t => {
  t.throws(auth.login('banana', 'wrong'), 'user-doesnt-exist')
})

test('stays logged in until log out', t => {
  auth.login('juan', 'password')
    .then(() => {
      t.true(auth.loggedIn())
      auth.logOut(() => {
        t.false(auth.loggedIn())
      })
    })
})
