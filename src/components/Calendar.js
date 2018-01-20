import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'
import '../styles/calendar-styles.css'

/*
const Intro = styled.p`
  font-size: large;
`
*/

function Calendar({ state, onUserSignOut }) {
  const calendar = state.calendar.calendar
  return (
    <section id="Calendar" className="col row">
      <div className="calendar col row">
        <div className="left-column col-6">
          <ul className="calendar-layout">
            {calendar.layouts.left.map((item, key) => {
              return (
                <li key={key} className={`${item.type} item`} data-value={item.value}>
                  {item.title}
                </li>
              )
            })}
          </ul>
        </div>
        <div className="right-column col-6">
          <ul className="calendar-layout">
            {calendar.layouts.right.map((item, key) => {
              return (
                <li key={key} className={`${item.type} item`} data-value={item.value}>
                  {item.title}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="control-panel col-12">
        <button type="button" className="btn btn-primary col" data-value="Signout" onClick={onUserSignOut}>
          Sign out
        </button>
        <button type="button" className="btn btn-primary col" data-value="clearEvents">
          Clear all events
        </button>
      </div>
    </section>
  )
}

/*
Calendar.propTypes = {
  counter: PropTypes.number.isRequired,
}
*/

export default pure(Calendar)
