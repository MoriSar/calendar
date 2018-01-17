import { INIT } from 'constants/ActionTypes'

const initialState = {}

export default function calendar(state = initialState, action) {
  switch (action.type) {
    case INIT:
      return state
    default:
      return state
  }
}
