import {
    ON_SIGN_IN,
    ON_SIGN_UP,
    ON_SIGN_OUT,
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

function onSignIn(state, payload) {
    return {
        ...state,
        currentState: 'Calendar'
    };
}

function onSignUp(state, payload) {
    return state;
}

function onSignOut(state, payload) {
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
        case ON_SIGN_IN:
            return onSignIn(state, action.payload)
        case ON_SIGN_UP:
            return onSignUp(state, action.payload)
        case ON_SIGN_OUT:
            return onSignOut(state, action.payload)
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
