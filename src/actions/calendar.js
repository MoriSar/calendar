import {
  ON_SIGN_IN,
  ON_SIGN_UP,
  ON_SIGN_OUT,
  ON_LOGIN_CHANGE,
  ON_PASSWORD_CHANGE,
  SESSION_IS_ACTIVE,
  SESSION_IS_GONE,
  ON_ADD_EVENT,
  ON_REMOVE_ITEM,
  ON_SELECT_CHANGE,
  ON_SEND_CALENDAR_TO_DB,
  ON_GET_CALENDAR_FROM_DB,
  SETUP_CLIENT_CALENDAR,
  ON_CLEAR_ALL_EVENTS,
  ON_EXPORT_CALENDAR,
} from 'constants/ActionTypes'
import { createAction } from 'redux-actions'

export const onUserSignIn = createAction(ON_SIGN_IN)
export const onUserSignUp = createAction(ON_SIGN_UP)
export const onUserSignOut = createAction(ON_SIGN_OUT)
export const onLoginChange = createAction(ON_LOGIN_CHANGE)
export const onPasswordChange = createAction(ON_PASSWORD_CHANGE)
export const sessionIsActive = createAction(SESSION_IS_ACTIVE)
export const sessionIsGone = createAction(SESSION_IS_GONE)
export const onAddEvent = createAction(ON_ADD_EVENT)
export const onRemoveItem = createAction(ON_REMOVE_ITEM)
export const onSelectChange = createAction(ON_SELECT_CHANGE)
export const onSendCalendarToDb = createAction(ON_SEND_CALENDAR_TO_DB)
export const onGetCalendarFromDb = createAction(ON_GET_CALENDAR_FROM_DB)
export const setupCliendCalendar = createAction(SETUP_CLIENT_CALENDAR)
export const onClearAllEvents = createAction(ON_CLEAR_ALL_EVENTS)
export const onExportCalendar = createAction(ON_EXPORT_CALENDAR)
