import {
    ON_SIGN_IN,
    ON_SIGN_UP,
    ON_SIGN_OUT,
    ON_LOGIN_CHANGE,
    ON_PASSWORD_CHANGE,
    SESSION_IS_ACTIVE,
    SESSION_IS_GONE
} from 'constants/ActionTypes'
import {createAction} from 'redux-actions'

export const onUserSignIn = createAction(ON_SIGN_IN)
export const onUserSignUp = createAction(ON_SIGN_UP)
export const onUserSignOut = createAction(ON_SIGN_OUT)
export const onLoginChange = createAction(ON_LOGIN_CHANGE)
export const onPasswordChange = createAction(ON_PASSWORD_CHANGE)
export const sessionIsActive = createAction(SESSION_IS_ACTIVE)
export const sessionIsGone = createAction(SESSION_IS_GONE)
