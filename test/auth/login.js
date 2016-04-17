import test from 'ava'
import auth from '../../app/auth/'

test.cb('returns true on correct login', t => {
  auth.login('juan', 'password', response => {
    t.truthy(response)
    t.end()
  })
})

test.cb('returns error on wrong password', t => {
  auth.login('juan', 'wrong', (response, error) => {
    t.falsy(response)
    t.is(error.type, 'password-wrong')
    t.end()
  })
})

test.cb('returns error on inexistent users', t => {
  auth.login('banana', 'wrong', (response, error) => {
    t.falsy(response)
    t.is(error.type, 'user-doesnt-exist')
    t.end()
  })
})

test.cb('stays logged in until log out', t => {
  auth.login('juan', 'password', () => {
    t.true(auth.loggedIn())
    auth.logOut(() => {
      t.false(auth.loggedIn())
      t.end()
    })
  })
})
