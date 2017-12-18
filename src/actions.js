import querystring from 'querystring';
import axios  from 'axios';
import {reset} from 'redux-form';

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
                    localStorage.setItem('idToken', user.token);
                    let token = localStorage.getItem('idToken');
                    //console.log(token);
                    // Dispatch the success action
                    dispatch(receiveLogin(user));
                }
            }).catch(err => console.log("Error: ", err))
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout());
        localStorage.removeItem('idToken');
        dispatch(receiveLogout())
    }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST';
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS';
export const QUOTE_FAILURE = 'QUOTE_FAILURE';

// Uses the API middlware to get a quote
export function fetchQuote() {
    return {
        [CALL_API]: {
            endpoint: 'household/list',
            types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
        }
    }
}

export const SUBMIT_SUCCESS = 'SUBMIT_SUCCESS';

function submitSuccess(humanID){
    console.log('it happened!');
    return{
        type : SUBMIT_SUCCESS,
        isCompleted: true,
        payload: humanID
    }

}

export function saveData(values){
    let token = localStorage.getItem('idToken');
    const AuthStr = 'Bearer '.concat(token);
    let headers ={
        headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
    };


    return dispatch => {

        axios.post(BASE_URL + 'human/new', values, headers)
            .then(function (response) {
                console.log(values);
                console.log(response);
                alert("Your submit was successful");
                let humanID = response.data.humanId;
                dispatch(submitSuccess(humanID));
                //dispatch(reset('wizard'));
            }).catch(function (error) {
                console.log(values);
            console.log(error.response);
            alert(error.response.statusText);
        });
    };

}
