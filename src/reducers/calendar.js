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
    SETUP_CLIENT_CALENDAR
} from 'constants/ActionTypes'

const initialState = {
    currentState: 'wait',
    authenticationState: '',
    login: {
        name: '',
        password: '',
    },
    calendar: {
        layouts: [
            {
                title: '8:00',
                value: 0,
                type: 'main',
                events: [],
            },
            {
                title: '8:30',
                value: 30,
                type: 'secondary',
                events: [],
            },
            {
                title: '9:00',
                value: 60,
                type: 'main',
                events: [],
            },
            {
                title: '9:30',
                value: 90,
                type: 'secondary',
                events: [],
            },
            {
                title: '10:00',
                value: 120,
                type: 'main',
                events: [],
            },
            {
                title: '10:30',
                value: 150,
                type: 'secondary',
                events: [],
            },
            {
                title: '11:00',
                value: 180,
                type: 'main',
                events: [],
            },
            {
                title: '11:30',
                value: 210,
                type: 'secondary',
                events: [],
            },
            {
                title: '12:00',
                value: 240,
                type: 'main',
                events: [],
            },
            {
                title: '12:30',
                value: 270,
                type: 'secondary',
                events: [],
            },
            {
                title: '1:00',
                value: 300,
                type: 'main',
                events: [],
            },
            {
                title: '1:30',
                value: 330,
                type: 'secondary',
                events: [],
            },
            {
                title: '2:00',
                value: 360,
                type: 'main',
                events: [],
            },
            {
                title: '2:30',
                value: 390,
                type: 'secondary',
                events: [],
            },
            {
                title: '3:00',
                value: 420,
                type: 'main',
                events: [],
            },
            {
                title: '3:30',
                value: 450,
                type: 'secondary',
                events: [],
            },
            {
                title: '4:00',
                value: 480,
                type: 'main',
                events: [],
            },
            {
                title: '4:30',
                value: 510,
                type: 'secondary',
                events: [],
            },
            {
                title: '5:00',
                value: 540,
                type: 'main',
                events: [],
            },
        ],
        events: [],
        newEventParam: {
            start: 0,
            duration: 0,
            title: '',
            id: 0,
        },
        controlPanel: {
            startInput: {value: 0},
            durationInput: {value: 0},
            titleInput: {value: ''}
        }
    },
}
const setCookie = (name, value, days = 7, path = '/') => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

const getCookie = name => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '')
}

const deleteCookie = (name, path) => {
    setCookie(name, '', -1, path)
}

function onSignIn(state, payload) {
    return {
        ...state,
        currentState: payload.resp.title,
        authenticationState: payload.resp.status,
    }
}

function onSignUp(state, payload) {
    return {
        ...state,
        currentState: payload.resp.title,
        authenticationState: payload.resp.status,
    }
}

function onSignOut(state, payload) {
    const calendar = state.calendar
    return {
        ...state,
        currentState: payload.resp.title,
        authenticationState: payload.resp.status,
        calendar: {
            ...calendar,
            events: []
        }
    }
}

function sessionIsActive(state, payload) {
    return {
        ...state,
        currentState: 'Calendar',
    }
}

function sessionIsGone(state, payload) {
    return {
        ...state,
        currentState: 'Login',
    }
}

function onLoginChange(state, payload) {
    let value = payload.event.currentTarget.value
    const login = state.login
    return {
        ...state,
        login: {
            ...login,
            name: value,
        },
    }
}

function onPasswordChange(state, payload) {
    let value = payload.event.currentTarget.value
    const login = state.login
    return {
        ...state,
        login: {
            ...login,
            password: value,
        },
    }
}

function addEvent(state, payload) {
    const events = state.calendar.events
    const newEventParam = state.calendar.newEventParam
    const calendar = state.calendar
    newEventParam.id = Date.now()
    const newEvents = [...events, newEventParam];
    payload.writeToDb({calendar: newEvents});
    return {
        ...state,
        calendar: {
            ...calendar,
            events: newEvents,
            newEventParam: {
                start: 0,
                duration: 0,
                title: '',
                id: 0,
            },
            controlPanel: {
                startInput: {value: state.calendar.layouts[0].value},
                durationInput: {value: state.calendar.layouts[0].value},
                titleInput: {value: ''}
            }
        },
    }
}

function removeItem(state, payload) {
    const eventId = Number(payload.event.currentTarget.id);
    const events = state.calendar.events;
    const calendar = state.calendar;
    let newEvents = state.calendar.events.filter((item, key) => {
        return item.id !== eventId;
    });
    payload.writeToDb({calendar: newEvents});
    return {
        ...state,
        calendar: {
            ...calendar,
            events: newEvents
        }
    }
}

function onSelectChange(state, payload) {
    const target = payload.event.currentTarget
    const calendar = state.calendar
    let titleValue,
        startValue = state.calendar.newEventParam.start,
        durationValue = state.calendar.newEventParam.duration

    if (target.id === 'title') {
        titleValue = target.value
    } else {
        startValue = target.id === 'start' ? Number(target.value) : state.calendar.newEventParam.start
        durationValue =
            target.id === 'duration' ? Number(target.value) - startValue : state.calendar.newEventParam.duration - startValue
        if (durationValue < 0) {
            durationValue = 0
        }
    }

    return {
        ...state,
        calendar: {
            ...calendar,
            newEventParam: {
                start: startValue,
                duration: durationValue,
                title: titleValue,
            },
        },
    }
}

function getCalendarFromDb(state, payload) {
    const calendar = state.calendar
    return {
        ...state,
        calendar: {
            ...calendar,
            events: payload.data.calendar
        },
    };
}

function sendCalendarToDb(state, payload) {
    return state;
}

function setupClientCalendar(state, payload) {
    const calendar = state.calendar
    return {
        ...state,
        calendar: {
            ...calendar,
            events: payload.data.calendar
        },
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
        case ON_ADD_EVENT:
            return addEvent(state, action.payload)
        case ON_REMOVE_ITEM:
            return removeItem(state, action.payload)
        case ON_SELECT_CHANGE:
            return onSelectChange(state, action.payload)
        case ON_SEND_CALENDAR_TO_DB:
            return sendCalendarToDb(state, action.payload)
        case ON_GET_CALENDAR_FROM_DB:
            return getCalendarFromDb(state, action.payload)
        case SETUP_CLIENT_CALENDAR:
            return setupClientCalendar(state, action.payload)
        default:
            return state
    }
}
