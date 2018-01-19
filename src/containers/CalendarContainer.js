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
    'userSingIn': {
        method: 'post',
        url: 'http://localhost:3030/users/singin'
    },
    'userSingUp': {
        method: 'post',
        url: 'http://localhost:3030/users/singup'
    },
    'userSingOut': {
        method: 'post',
        url: 'http://localhost:3030/users/singout'
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
        const body = JSON.stringify(data) || null;
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
    onSubmit = event => {
        this.props.onSubmit({event})
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
                    onSubmit={this.onSubmit}
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
