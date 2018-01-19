import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'
import '../styles/login-styles.css'

/*
const Intro = styled.p`
  font-size: large;
`
*/

function Login({state, onSubmit}) {
    return (
        <section id='Login'>
            <form onSubmit={onSubmit}>
                <div className="container">
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required/>

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required/>

                    <button type="submit">Login</button>
                </div>
            </form>
        </section>
    )
}

/*
Calendar.propTypes = {
  counter: PropTypes.number.isRequired,
}
*/

export default pure(Login)
