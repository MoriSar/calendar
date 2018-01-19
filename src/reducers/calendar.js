import {
    ON_SUBMIT,
    SESSION_IS_ACTIVE,
    SESSION_IS_GONE
} from 'constants/ActionTypes'

const initialState = {
    currentState: 'wait'
}

function onSubmit(state, payload) {
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

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case ON_SUBMIT:
      return onSubmit(state, action.payload)
    case SESSION_IS_ACTIVE:
      return sessionIsActive(state, action.payload)
    case SESSION_IS_GONE:
      return sessionIsGone(state, action.payload)
    default:
      return state
  }
}
