import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Logout from './Logout'
import { logoutUser } from '../actions'
import littlebearlogo from '../assets/images/little-bear.png';
import Icon from '../helpers/svgImports'

export default class Navbar extends Component {

    render() {
        const { dispatch, isAuthenticated, errorMessage } = this.props

        return (
            <nav className='navbar navbar-default'>
                <div className='container'>
                    <a className="navbar-brand" href="#">
                        <img src={littlebearlogo}
                             className="img-responsive" alt="Little Bear"/></a>
                    <div className='navbar-form pull-right logout-user'>
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

