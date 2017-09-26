import querystring from 'querystring';

import {CALL_API, BASE_URL} from './middleware/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        id_token: user.id_token

    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

export function loginUser(creds) {

    const data = querystring.stringify({_username: creds.username, _password: creds.password});

    let config = {
        method: 'POST',
        headers: { 'Content-Type':'application/x-www-form-urlencoded' },
        body: data
    };




    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return fetch(BASE_URL+'login_check', config)
            .then(response =>
                response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
                if (!response.ok) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(user.message));
                    return Promise.reject(user)
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', user.token);
                    let token = localStorage.getItem('id_token')
                    console.log(token);
                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        localStorage.removeItem('access_token')
        dispatch(receiveLogout())
    }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'household/list',
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}

// Same API middlware is used to get a
// secret quote, but we set authenticated
// to true so that the auth header is sent
/*
export function fetchSecretQuote() {
    return {
        [CALL_API]: {
            endpoint: '/household/list',
            authenticated: true,
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}
*/
