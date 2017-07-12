//import { post } from 'axios';
import axios  from 'axios';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/*export default (async function showResults(values) {
 await sleep(500); // simulate server latency
 window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
 });*/
export default (async function showResults(values, dispatch) {
    //await sleep(500); // simulate server latency
    //window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
    axios.post('http://103.198.135.55:8000/api/human/new', values)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
});

