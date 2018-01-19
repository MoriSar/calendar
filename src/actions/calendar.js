import {
    ON_LOGIN,
    ON_LOGUP,
    ON_LOGOUT,
    ON_LOGIN_CHANGE,
    ON_PASSWORD_CHANGE,
    SESSION_IS_ACTIVE,
    SESSION_IS_GONE
} from 'constants/ActionTypes'
import {createAction} from 'redux-actions'

export const onLogin = createAction(ON_LOGIN)
export const onLogup = createAction(ON_LOGUP)
export const onLogout = createAction(ON_LOGOUT)
export const onLoginChange = createAction(ON_LOGIN_CHANGE)
export const onPasswordChange = createAction(ON_PASSWORD_CHANGE)
export const sessionIsActive = createAction(SESSION_IS_ACTIVE)
export const sessionIsGone = createAction(SESSION_IS_GONE)
