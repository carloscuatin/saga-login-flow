import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt'
import {browserHistory} from 'react-router'
import {take, call, put, fork} from 'redux-saga/effects'
import auth from '../auth'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM
} from '../actions/constants'

function * authorize (username, password, isRegistering) {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    let salt = genSalt(username)
    let hash = hashSync(password, salt)
    let response

    if (isRegistering) {
      response = yield call(auth.register, username, hash)
    } else {
      response = yield call(auth.login, username, hash)
    }

    return response
  } catch (error) {
    throw error
  } finally {
    yield put({type: SENDING_REQUEST, sending: false})
  }
}

function * logout () {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    let response = yield call(auth.logout)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    console.log(error)
  }
}

export function * loginFlow () {
  while (true) {
    let request = yield take(LOGIN_REQUEST)
    let {username, password} = request.data

    try {
      yield call(authorize, username, password, false)
      yield put({type: SET_AUTH, newState: true})
      yield put({type: CHANGE_FORM, newState: {username: '', password: ''}})
      forwardTo('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
}

export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH, newState: false})

    yield call(logout)
    forwardTo('/')
  }
}

export function * registerFlow () {
  while (true) {
    let request = yield take(REGISTER_REQUEST)
    let {username, password} = request.data

    try {
      yield call(authorize, username, password, true)
      yield put({type: SET_AUTH, newState: true})
      yield put({type: CHANGE_FORM, newState: {username: '', password: ''}})
      forwardTo('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }
}

export default function * root () {
  yield fork(loginFlow)
  yield fork(logoutFlow)
  yield fork(registerFlow)
}

function forwardTo (location) {
  browserHistory.push(location)
}
