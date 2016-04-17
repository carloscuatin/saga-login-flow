import test from 'ava'
import auth from '../../app/auth/'

test.cb('registrates when given good data', t => {
  auth.register('jennifer', 'password', response => {
    t.truthy(response)
    t.end()
  })
})

test.cb('returns error when given existing user', t => {
  auth.register('juan', 'password', (response, error) => {
    t.falsy(response)
    t.is(error.type, 'username-exists')
    t.end()
  })
})
