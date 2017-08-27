import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import TestComponent from '../components/test'
import '../styles/css/index.css';

class App extends Component{
    render(){
        const { dispatch, isAuthenticated, errorMessage } = this.props
        return (
            <div>
                {!isAuthenticated &&
                <Login errorMessage={errorMessage} onLoginClick={ creds => dispatch(loginUser(creds)) }
                />
                }
                {isAuthenticated &&
                <Navbar
                    isAuthenticated={isAuthenticated}
                    errorMessage={errorMessage}
                    dispatch={dispatch}
                />
                }
                <div className='container'>
                    <TestComponent isAuthenticated={isAuthenticated} />
                </div>
            </div>
        )
    }
}
App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
};

// These props come from the application's
// state when it is started
function mapStateToProps(state) {

    const { auth } = state
    const { isAuthenticated, errorMessage } = auth
    return {
        isAuthenticated,
        errorMessage
    }
}

export default connect(mapStateToProps)(App)