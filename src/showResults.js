import axios  from 'axios';
import {BASE_URL} from './middleware/api';
import {reset} from 'redux-form';

let token = localStorage.getItem('id_token');
const AuthStr = 'Bearer '.concat(token);

let headers ={
    headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
};

export default (async function showResults(values, dispatch) {
    axios.post(BASE_URL + 'human/new', values, headers)
        .then(function (response) {
            console.log(response);
            alert("Your submit was successful");
            dispatch(reset('wizard'));
        })
        .catch(function (error) {
            console.log(error.response);
            alert(error.response.statusText);
        });
});

