import React from 'react'
import PropTypes from 'prop-types'
import {Calendar, Login} from 'components'
import {createStructuredSelector, createSelector} from 'reselect'
import Ajax from 'ajax-promise-es6'
import '../styles/main-styles.css';

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as CalendarActions from 'actions/calendar'

const API = {
    'start': {
        method: 'get',
        url: 'http://localhost:3030'
    },
    'userSignIn': {
        method: 'post',
        url: 'http://localhost:3030/users/signin'
    },
    'userSignUp': {
        method: 'post',
        url: 'http://localhost:3030/users/signup'
    },
    'userSignOut': {
        method: 'post',
        url: 'http://localhost:3030/users/signout'
    },
    'getCalendar': {
        method: 'post',
        url: 'http://localhost:3030/calendar/get'
    },
    'updateCalendar': {
        method: 'post',
        url: 'http://localhost:3030/calendar/update'
    }
};

class CalendarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state;
    }
    useAPI(api, actionRes, actionRej, data){
        const url = API[api].url;
        const body = data || null;
        const headers = {};
        Ajax[API[api].method](url, body, headers).then((res)=> {
            actionRes(JSON.parse(res));
        }).catch((err)=> {
            actionRej(err);
        });
    }
    checkSession(){
        this.useAPI('start', (resp) => {if (resp.title === 'Login') {
            this.sessionIsGone();
        } else if (resp.title === 'Calendar') {
            this.sessionIsActive();
        }}, () => {});
    }
    onServerError(){}
    sessionIsActive(event) {
        this.props.sessionIsActive({event});
    }
    sessionIsGone(event) {
        this.props.sessionIsGone({event});
    }
    onUserSignIn = event => {
        event.preventDefault();
        const data = {
            name: this.props.state.calendar.login.name,
            password: this.props.state.calendar.login.password
        };
        this.useAPI('userSignIn', (resp) => {
            this.props.onUserSignIn({event, payload: resp});
        }, () => {}, data);
    }
    onUserSignUp = event => {
        event.preventDefault();
        const data = {
            name: this.props.state.calendar.login.name,
            password: this.props.state.calendar.login.password
        };
        this.useAPI('userSignUp', (resp) => {
            this.props.onUserSignUp({event, payload: resp});
        }, () => {}, data);
    }
    onUserSignOut = event => {
        event.preventDefault();
        this.useAPI('userSignOut', (resp) => {
            this.props.onUserSignOut({event, payload: resp});
        }, () => {});
    }
    onLoginChange = event => {
        this.props.onLoginChange({event});
    }
    onPasswordChange = event => {
        this.props.onPasswordChange({event});
    }

    componentDidMount() {
        this.checkSession()
    }
    render() {
        const state = this.props.state.calendar;
        return <div className="App row" data-state={state.currentState}>
            <main>
                <Login
                    state={this.props.state}
                    onUserSignIn={this.onUserSignIn}
                    onUserSignUp={this.onUserSignUp}
                    onLoginChange={this.onLoginChange}
                    onPasswordChange={this.onPasswordChange}
                />
                <Calendar/>
            </main>
        </div>
    }
}

const mapStateToProps = createStructuredSelector({
    state: createSelector(state => state, calendarState => calendarState),
})

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CalendarActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
