import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt'
import {browserHistory} from 'react-router'
import {take, call, put, fork, race} from 'redux-saga/effects'
import auth from '../auth'

import {
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  SET_AUTH,
  LOGOUT,
  CHANGE_FORM,
  REQUEST_ERROR
} from '../actions/constants'

function * authorize (username, password, options) {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    let salt = genSalt(username)
    let hash = hashSync(password, salt)
    let response

    if (options.isRegistering) {
      response = yield call(auth.register, username, hash)
    } else {
      response = yield call(auth.login, username, hash)
    }

    return response
  } catch (error) {
    yield put({type: REQUEST_ERROR, error: error.message})

    return false
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
    yield put({type: REQUEST_ERROR, error: error.message})
  }
}

export function * loginFlow () {
  while (true) {
    let request = yield take(LOGIN_REQUEST)
    let {username, password} = request.data

    let winner = yield race({
      auth: call(authorize, username, password, {isRegistering: false}),
      logout: take(LOGOUT)
    })

    if (winner.auth) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
    } else if (winner.logout) {
      yield put({type: SET_AUTH, newAuthState: false})
      yield call(logout)
      forwardTo('/')
    }
  }
}

export function * logoutFlow () {
  while (true) {
    yield take(LOGOUT)
    yield put({type: SET_AUTH, newAuthState: false})

    yield call(logout)
    forwardTo('/')
  }
}

export function * registerFlow () {
  while (true) {
    let request = yield take(REGISTER_REQUEST)
    let {username, password} = request.data

    let wasSuccessful = yield call(authorize, username, password, {isRegistering: true})

    if (wasSuccessful) {
      yield put({type: SET_AUTH, newAuthState: true})
      yield put({type: CHANGE_FORM, newFormState: {username: '', password: ''}})
      forwardTo('/dashboard')
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
