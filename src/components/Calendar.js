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

function Calendar({
  state,
  onUserSignOut,
  onAddEvent,
  onRemoveItem,
  onSelectChange,
  onClearAllEvents,
  onExportCalendar,
}) {
  const calendar = state.calendar.calendar
  return (
    <section id="Calendar" className="col row">
      <div className="calendar col row">
        <div className="column col-6">
          <ul className="calendar-layout">
            {calendar.layouts.map((item, key) => {
              return (
                <li key={key} className={`${item.type} item`} data-value={item.value}>
                  {item.title}
                </li>
              )
            })}
          </ul>
          <div className="events">
            {calendar.events.map((item, key) => {
              return (
                <div
                  key={key}
                  className="event"
                  onClick={onRemoveItem}
                  id={item.id}
                  style={{
                    top: `${item.top * 2}px`,
                    left: `${item.left}px`,
                    height: `${item.height * 2}px`,
                    width: `${item.eventWidth}px`,
                  }}
                >
                  {item.title}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="control-panel col-6">
        <div className="add-event-panel">
          <h3>Add event</h3>
          <p>Event Start</p>
          <select
            className="custom-select"
            id="start"
            onChange={onSelectChange}
            value={state.calendar.calendar.controlPanel.startInput.value}
            ref={input => {
              state.calendar.calendar.controlPanel.startInput = input
            }}
          >
            {calendar.layouts.map((item, key) => {
              return (
                <option key={key} value={item.value}>
                  {item.title}
                </option>
              )
            })}
          </select>
          <p>Event Duration</p>
          <select
            className="custom-select"
            id="duration"
            onChange={onSelectChange}
            value={state.calendar.calendar.controlPanel.durationInput.value}
            ref={input => {
              state.calendar.calendar.controlPanel.durationInput = input
            }}
          >
            {calendar.layouts.map((item, key) => {
              return (
                <option key={key} value={item.value}>
                  {item.title}
                </option>
              )
            })}
          </select>
          <input
            type="text"
            className="form-control"
            placeholder="Event Title"
            id="title"
            onChange={onSelectChange}
            value={state.calendar.calendar.controlPanel.titleInput.value}
            ref={input => {
              state.calendar.calendar.controlPanel.titleInput = input
            }}
          />
          <button type="button" className="btn btn-secondary col" data-value="AddEvent" onClick={onAddEvent}>
            Add event
          </button>
          <button type="button" className="btn btn-info col" data-value="AddEvent" onClick={onExportCalendar}>
            Export
          </button>
        </div>
        <button type="button" className="btn btn-primary col" data-value="Signout" onClick={onUserSignOut}>
          Sign out
        </button>
        <button type="button" className="btn btn-primary col" data-value="clearEvents" onClick={onClearAllEvents}>
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
