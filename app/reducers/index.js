import {CHANGE_FORM, SET_AUTH, SENDING_REQUEST} from '../actions/constants'
import auth from '../auth'

let assign = Object.assign

let initialState = {
  formState: {
    username: '',
    password: ''
  },
  currentlySending: false,
  loggedIn: auth.loggedIn()
}

function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_FORM:
      return assign({}, state, {
        formState: action.newState
      })
    case SET_AUTH:
      return assign({}, state, {
        loggedIn: action.newState
      })
    case SENDING_REQUEST:
      return assign({}, state, {
        currentlySending: action.sending
      })
    default:
      return state
  }
}

export default reducer
