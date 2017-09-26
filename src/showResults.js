import axios  from 'axios';
import {BASE_URL} from './middleware/api';
import jwt from 'jsonwebtoken';

const token = localStorage.getItem('id_token');
const AuthStr = 'Bearer '.concat(token);

let headers ={
    headers: { 'Content-Type':'application/json','Authorization' : AuthStr }
};

let isExpired = false;
let decodedToken=jwt.decode(token, {complete: true});
let dateNow = new Date();

if(decodedToken.exp < dateNow.getTime())
    isExpired = true;

export default (async function showResults(values, dispatch) {
   /* jwt.verify(token, 'shhhhh', { algorithm: 'public.pem'},function(err, decoded) {
        if (!err) {

    } else {
        console.log(token);
        console.log(err)
    }
    });*/
    axios.post(BASE_URL + 'human/new', values, headers)
        .then(function (response) {
            console.log(isExpired)
            console.log(response);
        })
        .catch(function (error) {
            console.log(isExpired)
            console.log(error.response);
        });
});

