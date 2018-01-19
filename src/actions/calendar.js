import {
    ON_SUBMIT,
    SESSION_IS_ACTIVE,
    SESSION_IS_GONE
} from 'constants/ActionTypes'
import {createAction} from 'redux-actions'

export const onSubmit = createAction(ON_SUBMIT)
export const sessionIsActive = createAction(SESSION_IS_ACTIVE)
export const sessionIsGone = createAction(SESSION_IS_GONE)
