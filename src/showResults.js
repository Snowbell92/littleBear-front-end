//import { post } from 'axios';
import axios  from 'axios';
import {BASE_URL} from './middleware/api'

//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/*export default (async function showResults(values) {
 await sleep(500); // simulate server latency
 window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
 });*/
let token = localStorage.getItem('id_token') || null;
const AuthStr = 'Bearer '.concat(token);
export default (async function showResults(values, dispatch) {
    //await sleep(500); // simulate server latency
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    axios.post(BASE_URL + 'human/new', { headers: { Authorization: AuthStr } }, values)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});

