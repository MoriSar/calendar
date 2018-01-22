import React from 'react'
import PropTypes from 'prop-types'
import {Calendar, Login} from 'components'
import {createStructuredSelector, createSelector} from 'reselect'
import Ajax from 'ajax-promise-es6'
import '../styles/main-styles.css'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CalendarActions from 'actions/calendar'

const API = {
    start: {
        method: 'GET',
        url: 'http://localhost:3030',
    },
    userSignIn: {
        method: 'POST',
        url: 'http://localhost:3030/users/signin',
    },
    userSignUp: {
        method: 'POST',
        url: 'http://localhost:3030/users/signup',
    },
    userSignOut: {
        method: 'POST',
        url: 'http://localhost:3030/users/signout',
    },
    getCalendar: {
        method: 'POST',
        url: 'http://localhost:3030/calendar/get',
    },
    updateCalendar: {
        method: 'POST',
        url: 'http://localhost:3030/calendar/update',
    },
}

class CalendarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state
    }

    getCookie(name) {
        let matches = document.cookie.match(
            new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
        )
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

    useAPI(api, actionRes, actionRej, data, headers) {
        const myInit = {
            method: API[api].method,
            body: JSON.stringify(data) || null,
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            mode: 'cors',
            cache: 'default',
        }
        fetch(API[api].url, myInit)
            .then(function (response) {
                return response.json()
            })
            .then(function (json) {
                actionRes(json)
            })
            .catch(function (err) {
                actionRej(err)
            })
    }

    checkSession() {
        const cookie = this.getCookie('username')
        this.useAPI(
            'start',
            resp => {
                if (resp.title === 'Login') {
                    this.sessionIsGone()
                } else if (resp.title === 'Calendar') {
                    this.sessionIsActive()
                }
            },
            () => {
            }
        )
    }

    onServerError() {
    }

    sessionIsActive(event) {
        this.props.sessionIsActive({event})
    }

    sessionIsGone(event) {
        this.props.sessionIsGone({event})
    }

    onUserSignIn = event => {
        event.preventDefault()
        const data = {
            name: this.props.state.calendar.login.name,
            password: this.props.state.calendar.login.password,
        }
        // const data = `name=${this.props.state.calendar.login.name}&password=${this.props.state.calendar.login.password}`;
        const headers = {
            withCredentials: true, // headers
        }

        this.useAPI(
            'userSignIn',
            resp => {
                this.props.onUserSignIn({event, resp})
            },
            () => {
            },
            data,
            headers
        )
    }
    onUserSignUp = event => {
        event.preventDefault()
        const data = {
            name: this.props.state.calendar.login.name,
            password: this.props.state.calendar.login.password,
        }
        this.useAPI(
            'userSignUp',
            resp => {
                this.props.onUserSignUp({event, resp})
            },
            () => {
            },
            data
        )
    }
    onUserSignOut = event => {
        event.preventDefault()
        const data = {
            name: this.props.state.calendar.login.name,
        }
        this.useAPI(
            'userSignOut',
            resp => {
                this.props.onUserSignOut({event, resp})
            },
            () => {
            },
            data
        )
    }
    onLoginChange = event => {
        this.props.onLoginChange({event})
    }
    onPasswordChange = event => {
        this.props.onPasswordChange({event})
    }
    onAddEvent = event => {
        this.props.onAddEvent({event})
        this.props.onSendCalendarToDb({event});
    }
    onRemoveItem = event => {
        this.props.onRemoveItem({event})
    }
    onSelectChange = event => {
        this.props.onSelectChange({event})
    }

    componentDidMount() {
        this.checkSession()
    }

    render() {
        const state = this.props.state.calendar
        return (
            <div className="App row" data-state={state.currentState} data-authstate={state.authenticationState}>
                <main className="col">
                    <Login
                        state={this.props.state}
                        onUserSignIn={this.onUserSignIn}
                        onUserSignUp={this.onUserSignUp}
                        onLoginChange={this.onLoginChange}
                        onPasswordChange={this.onPasswordChange}
                    />
                    <Calendar
                        state={this.props.state}
                        onUserSignOut={this.onUserSignOut}
                        onAddEvent={this.onAddEvent}
                        onRemoveItem={this.onRemoveItem}
                        onSelectChange={this.onSelectChange}
                    />
                </main>
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    state: createSelector(state => state, calendarState => calendarState),
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CalendarActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
