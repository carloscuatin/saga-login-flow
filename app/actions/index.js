import {CHANGE_FORM, SET_AUTH, SENDING_REQUEST} from './constants'

export function changeForm (newState) {
  return {type: CHANGE_FORM, newState}
}

export function setAuthState (newState) {
  return {type: SET_AUTH, newState}
}

export function sendingRequest (sending) {
  return {type: SENDING_REQUEST, sending}
}
