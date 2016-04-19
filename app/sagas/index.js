import {hashSync} from 'bcryptjs'
import genSalt from '../auth/salt'
import {browserHistory} from 'react-router'
import {take, call, put, fork, cancel} from 'redux-saga/effects'
import auth from '../auth'

import {SENDING_REQUEST, LOGIN_REQUEST, SET_AUTH, LOGOUT} from '../actions/constants'

function * authorize (username, password) {
  yield put({type: SENDING_REQUEST, sending: true})

  try {
    let salt = genSalt(username)
    let hash = hashSync(password, salt)
    let response = yield call(auth.login, username, hash)
    yield put({type: SENDING_REQUEST, sending: false})

    return response
  } catch (error) {
    console.log(error)
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

export default function * loginFlow () {
  while (true) {
    let request = yield take(LOGIN_REQUEST)
    let {username, password} = request.data

    let authorizeTask = yield fork(authorize, username, password)
    yield put({type: SET_AUTH, newState: true})
    forwardTo('/dashboard')

    yield take(LOGOUT)
    yield cancel(authorizeTask)
    yield put({type: SET_AUTH, newState: false})

    yield call(logout)
    forwardTo('/')
  }
}

function forwardTo (location) {
  browserHistory.push(location)
}

