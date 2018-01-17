import React from 'react'
import PropTypes from 'prop-types'
import { Calendar } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as CalendarActions from 'actions/calendar'

class CalendarContainer extends React.Component {
  /*
  static propTypes = {
  }
*/
  render() {
    return <Calendar />
  }
}

const mapStateToProps = createStructuredSelector({
  counter: createSelector(state => state, calendarState => calendarState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CalendarActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarContainer)
