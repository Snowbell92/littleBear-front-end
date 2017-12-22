import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser, CLEAR_SUBMIT } from '../actions'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import TestComponent from '../components/test'
import '../styles/css/index.css';

class App extends Component{
    render(){
        const { dispatch, isAuthenticated, errorMessage, isPhotoSubmitted } = this.props
        return (
            <div>
                {!isAuthenticated &&
                <Login
                    errorMessage={errorMessage}
                    onLoginClick={ creds => dispatch(loginUser(creds)) }
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
                    {isPhotoSubmitted &&
                    <div>
                        <div>User succesfully created with photo</div>
                        <button onClick={() => dispatch({type: CLEAR_SUBMIT})}>Add another user</button>
                    </div>
                    }
                    {!isPhotoSubmitted &&
                    <TestComponent isAuthenticated={isAuthenticated} />
                    }
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

    const { auth, saved } = state
    const { isAuthenticated, errorMessage } = auth
    const { isPhotoSubmitted } = saved
    return {
        isAuthenticated,
        errorMessage,
        isPhotoSubmitted
    }
}

export default connect(mapStateToProps)(App)