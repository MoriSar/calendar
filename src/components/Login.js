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

function Login({state, onLogin, onLogup, onLoginChange, onPasswordChange}) {
    return (
        <section id='Login'>
            <form onSubmit={onLogin}>
                <div className="container">
                    <label><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required onChange={onLoginChange}/>

                    <label><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required onChange={onPasswordChange}/>

                    <button
                        onClick={onLogin}
                    >Login</button>
                    <button
                    onClick={onLogup}
                        type="">Logup</button>
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
