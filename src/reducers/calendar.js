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
      startInput: { value: 0 },
      durationInput: { value: 0 },
      titleInput: { value: '' },
    },
  },
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
      events: [],
    },
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
  const newEvents = [...events, newEventParam]
  payload.writeToDb({ calendar: newEvents })
  return {
    ...state,
    calendar: {
      ...calendar,
      events: layOutDay(newEvents),
      newEventParam: {
        start: 0,
        duration: 0,
        title: '',
        id: 0,
      },
      controlPanel: {
        startInput: { value: state.calendar.layouts[0].value },
        durationInput: { value: state.calendar.layouts[0].value },
        titleInput: { value: '' },
      },
    },
  }
}

function removeItem(state, payload) {
  const eventId = Number(payload.event.currentTarget.id)
  const events = state.calendar.events
  const calendar = state.calendar
  let newEvents = state.calendar.events.filter((item, key) => {
    return item.id !== eventId
  })
  payload.writeToDb({ calendar: newEvents })

  return {
    ...state,
    calendar: {
      ...calendar,
      events: layOutDay(newEvents),
    },
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
      events: payload.data.calendar,
    },
  }
}

function sendCalendarToDb(state, payload) {
  return state
}

function onClearAllEvents(state, payload) {
  const events = state.calendar.events
  const newEventParam = state.calendar.newEventParam
  const calendar = state.calendar
  newEventParam.id = Date.now()
  const newEvents = []
  payload.writeToDb({ calendar: newEvents })

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
        startInput: { value: state.calendar.layouts[0].value },
        durationInput: { value: state.calendar.layouts[0].value },
        titleInput: { value: '' },
      },
    },
  }
}

function setupClientCalendar(state, payload) {
  const calendar = state.calendar
  let events = layOutDay(payload.data.calendar)
  return {
    ...state,
    calendar: {
      ...calendar,
      events: events,
    },
  }
}

function onExportCalendar(state, payload) {
  payload.exportCalendar()
  return state
}

const containerHeight = 720
const containerWidth = 200
const minutesinDay = 60 * 12
let collisions = []
let width = []
let leftOffSet = []

function getCollisions(events) {
  //resets storage
  collisions = []

  for (let i = 0; i < 24; i++) {
    let time = []
    for (let j = 0; j < events.length; j++) {
      time.push(0)
    }
    collisions.push(time)
  }

  events.forEach((event, id) => {
    let end = event.start + event.duration
    let start = event.start
    let order = 1

    while (start < end) {
      let timeIndex = Math.floor(start / 30)

      while (order < events.length) {
        if (collisions[timeIndex].indexOf(order) === -1) {
          break
        }
        order++
      }

      collisions[timeIndex][id] = order
      start = start + 30
    }

    collisions[Math.floor((end - 1) / 30)][id] = order
  })
}

function getAttributes(events) {
  //resets storage
  width = []
  leftOffSet = []

  for (let i = 0; i < events.length; i++) {
    width.push(0)
    leftOffSet.push(0)
  }

  collisions.forEach(period => {
    // number of events in that period
    let count = period.reduce((a, b) => {
      return b ? a + 1 : a
    })

    if (count > 1) {
      period.forEach((event, id) => {
        // max number of events it is sharing a time period with determines width
        if (period[id]) {
          if (count > width[id]) {
            width[id] = count
          }
        }

        if (period[id] && !leftOffSet[id]) {
          leftOffSet[id] = period[id]
        }
      })
    }
  })
}

function layOutDay(events) {
  if (!events.length) {
    return []
  }

  let layoutEvents = []
  getCollisions(events)
  getAttributes(events)

  events.forEach((event, id) => {
    let end = event.start + event.duration
    let height = (end + event.start) / minutesinDay * containerHeight
    let top = event.start / minutesinDay * containerHeight
    let start = event.start
    let units = width[id]
    if (!units) {
      units = 1
    }
    let eventWidth = containerWidth / units
    let left = containerWidth / width[id] * (leftOffSet[id] - 1) + 100

    if (!left || left < 0) {
      left = 100
    }
    layoutEvents.push({
      ...event,
      height,
      top,
      left,
      units,
      eventWidth,
    })
  })

  return layoutEvents
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
    case ON_CLEAR_ALL_EVENTS:
      return onClearAllEvents(state, action.payload)
    case ON_EXPORT_CALENDAR:
      return onExportCalendar(state, action.payload)
    default:
      return state
  }
}
