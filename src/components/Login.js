import React, {Component} from 'react';
import PropTypes from 'prop-types';
import littlebearlogo from '../assets/images/little-bear.png';
import Icon from '../helpers/svgImports'

export default class Login extends Component {

    render() {
        const {errorMessage} = this.props;

        return (
            <div className="login-screen">
                <div className="container">
                    <div className="row">
                        <div className="login">
                            <div className="col-xxs-12 col-xs-8 col-sm-6 col-md-4 col-lg-4 center-block">
                                <div className="login-form">
                                    <div className="hero-text">
                                        <img src={littlebearlogo}
                                             className="img-responsive center-block" alt="Little Bear"/>
                                        <h5 className="text-center">Welcome to Little Bear! Please log in to continue.</h5>
                                    </div>

                                    <div className="form-group has-feedback">
                                        <label htmlFor="userName" className="sr-only">User Name</label>
                                        <input type="text" ref="username" className="form-control" placeholder="Username"/>
                                        <span className="form-control-feedback">
                                        <Icon icon='user' />
                                    </span>
                                    </div>

                                    <div className="form-group has-feedback">
                                        <label htmlFor="password" className="sr-only">Password</label>
                                        <input type="password" ref='password' className="form-control" placeholder="Password"/>
                                        <span className="form-control-feedback">
                                        <Icon icon="lock"/>
                                    </span>
                                    </div>

                                    <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
                                        Login
                                    </button>

                                    {errorMessage &&
                                    <p>{errorMessage}</p>
                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handleClick(event) {
        const username = this.refs.username
        const password = this.refs.password
        const creds = {username: username.value.trim(), password: password.value.trim()}
        this.props.onLoginClick(creds)
    }
}

Login.propTypes = {
    onLoginClick: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
}
