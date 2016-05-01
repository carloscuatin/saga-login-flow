import {
  CHANGE_FORM,
  SET_AUTH,
  SENDING_REQUEST,
  LOGIN_REQUEST,
  REGISTER_REQUEST,
  LOGOUT,
  REQUEST_ERROR
} from './constants'

export function changeForm (newState) {
  return {type: CHANGE_FORM, newState}
}

export function setAuthState (newState) {
  return {type: SET_AUTH, newState}
}

export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}

export function loginRequest (data) {
  return {type: LOGIN_REQUEST, data}
}

export function logout () {
  return {type: LOGOUT}
}

export function registerRequest (data) {
  return {type: REGISTER_REQUEST, data}
}

export function requestError (error) {
  return {type: REQUEST_ERROR, error}
}
