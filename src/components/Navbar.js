import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Logout from './Logout'
import { logoutUser } from '../actions'

export default class Navbar extends Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <a className="navbar-brand" href="#">App</a>
                    <div className='navbar-form'>
                        <Logout onLogoutClick={() => dispatch(logoutUser())} />
                    </div>
                </div>
            </nav>
        )
    }

}

Navbar.propTypes = {
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string
}

