import test from 'ava'
import {actionTest} from 'redux-ava'
import {changeForm, setAuthState, sendingRequest} from '../app/actions'

let formState = {
  username: 'juan',
  password: 'password'
}

test('changeForm action', actionTest(changeForm, formState, {type: 'CHANGE_FORM', newState: formState}))
test('setAuthState action', actionTest(setAuthState, true, {type: 'SET_AUTH', newState: true}))
test('sendingRequest action', actionTest(sendingRequest, true, {type: 'SENDING_REQUEST', sending: true}))
