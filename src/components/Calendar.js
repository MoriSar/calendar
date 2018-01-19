import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'

/*
const Intro = styled.p`
  font-size: large;
`
*/

function Calendar() {
  return (
    <section id='Calendar'>
      <p>Calendar</p>
    </section>
  )
}

/*
Calendar.propTypes = {
  counter: PropTypes.number.isRequired,
}
*/

export default pure(Calendar)
