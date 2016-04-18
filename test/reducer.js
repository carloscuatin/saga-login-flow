import test from 'ava'
import {reducerTest} from 'redux-ava'
import {changeForm, setAuthState, sendingRequest} from '../app/actions'
import app from '../app/reducers'

let stateBefore = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  loggedIn: false
}

test('reducer handles CHANGE_FORM action', reducerTest(
  app,
  stateBefore,
  changeForm({username: 'juan', password: 'password'}),
  Object.assign({}, stateBefore, {formState: {username: 'juan', password: 'password'}})
))

test('reducer handles SET_AUTH action', reducerTest(
  app,
  stateBefore,
  setAuthState(true),
  Object.assign({}, stateBefore, {loggedIn: true})
))

test('reducer handles SENDING_REQUEST action', reducerTest(
  app,
  stateBefore,
  sendingRequest(true),
  Object.assign({}, stateBefore, {currentlySending: true})
))
