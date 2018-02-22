import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_SUCCESS,
    QUOTE_REQUEST,
    QUOTE_SUCCESS,
    QUOTE_FAILURE,
    SUBMIT_SUCCESS,
    SUBMIT_PHOTO_SUCCESS,
    CLEAR_SUBMIT
} from './actions'
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('idToken') ? true : false,
    isFillingForm: localStorage.getItem('idToken') ? true : false
}, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            })
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: true,
                isFillingForm: true,
                errorMessage: ''
            })
        case LOGIN_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            })
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: true,
                isAuthenticated: false
            })
        default:
            return state
    }
}

// The quotes reducer
function quotes(state = {
    isFetching: false,
    quote: '',
    authenticated: false
}, action) {
    switch (action.type) {
        case QUOTE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })
        case QUOTE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                quote: action.response,
                authenticated: action.authenticated || false
            })
        case QUOTE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            })
        default:
            return state
    }
}

function saved (state = {
    isSubmitted: false,
    isPhotoSubmitted: false
}, action){
    switch (action.type){
        case CLEAR_SUBMIT:
            return Object.assign({}, state, {
                isSubmitted: false,
                isPhotoSubmitted: false
            })
        case SUBMIT_SUCCESS:
            return Object.assign({},state, {
                isSubmitted: true
            })
        case SUBMIT_PHOTO_SUCCESS:
            return Object.assign({},state, {
                isPhotoSubmitted: true
            })
        default:
            return state
    }
}

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
    quotes,
    auth,
    saved,
    form: reduxFormReducer, // mounted under "form"
});

export default reducer