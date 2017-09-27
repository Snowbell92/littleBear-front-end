import axios  from 'axios';
import {BASE_URL} from './middleware/api';
import {reset} from 'redux-form';

/*let token = localStorage.getItem('idToken');
const AuthStr = 'Bearer '.concat(token);

let headers ={
    headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
};*/

let showResults = (values, dispatch) =>{

    let token = localStorage.getItem('idToken');
    const AuthStr = 'Bearer '.concat(token);

    let headers ={
        headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
    };

    axios.post(BASE_URL + 'human/new', values, headers)
        .then(function (response) {
            console.log(response);
            alert("Your submit was successful");
            dispatch(reset('wizard'));
        }).catch(function (error) {
        console.log(error.response);
        alert(error.response.statusText);
    });
}

export default showResults;
/*export default (async function ShowResults(values, dispatch) {
	console.log(AuthStr);
    axios.post(BASE_URL + 'human/new', values, headers)
        .then(function (response) {
            console.log(response);          
            alert("Your submit was successful");
            //dispatch(reset('wizard'));
        }).catch(function (error) {
            console.log(error.response);
            alert(error.response.statusText);
        });
});*/

