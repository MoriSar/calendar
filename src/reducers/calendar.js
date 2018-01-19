import {
    ON_LOGIN,
    ON_LOGUP,
    ON_LOGOUT,
    ON_LOGIN_CHANGE,
    ON_PASSWORD_CHANGE,
    SESSION_IS_ACTIVE,
    SESSION_IS_GONE
} from 'constants/ActionTypes'

const initialState = {
    currentState: 'wait',
    login: {
        name: '',
        password: ''
    }
}

function onLogin(state, payload) {
  return state;
}
function onLogup(state, payload) {
  return state;
}
function onLogout(state, payload) {
  return state;
}
function sessionIsActive(state, payload) {
    return state;
}
function sessionIsGone(state, payload) {
    return {
        ...state,
        currentState: 'Login'
    };
}
function onLoginChange(state, payload) {
    let value = payload.event.currentTarget.value;
    const login = state.login
    return {
        ...state,
        login: {
            ...login,
            name: value
        }
    };
}
function onPasswordChange(state, payload) {
    let value = payload.event.currentTarget.value;
    const login = state.login
    return {
        ...state,
        login: {
            ...login,
            password: value
        }
    };
}
export default function calendar(state = initialState, action) {
  switch (action.type) {
    case ON_LOGIN:
      return onLogin(state, action.payload)
    case ON_LOGUP:
      return onLogup(state, action.payload)
    case ON_LOGOUT:
      return onLogout(state, action.payload)
    case ON_LOGIN_CHANGE:
      return onLoginChange(state, action.payload)
    case ON_PASSWORD_CHANGE:
      return onPasswordChange(state, action.payload)
    case SESSION_IS_ACTIVE:
      return sessionIsActive(state, action.payload)
    case SESSION_IS_GONE:
      return sessionIsGone(state, action.payload)
    default:
      return state
  }
}
