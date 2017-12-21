import axios  from 'axios';
import {BASE_URL} from './middleware/api';
import {reset} from 'redux-form';

let showResults = (values, dispatch, callback) =>{

    let token =localStorage.getItem('idToken');
    const AuthStr = 'Bearer '.concat(token);

    let headers ={
        headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
    };

    axios.post(BASE_URL + 'human/new', values, headers)
        .then(function (response) {
            console.log(response);
            alert("Your submit was successful");
            localStorage.setItem('humanID', response.data.humanId);
            let human = localStorage.getItem('humanID');
            console.log(human);
        }).then(function () {
        dispatch(reset('wizard'));
        if (callback){
            callback()
        }
    }).catch(function (error) {
        console.log(error.response);
        alert(error.response.statusText);
    });
}

export default showResults;

