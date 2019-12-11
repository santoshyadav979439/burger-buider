import axios from 'axios';
const instance =axios.create({
    baseURL:"https://react-my-burger-efe50.firebaseio.com/"
});
//instance.defaults.headers.common["Access-Control-Allow-Origin"] ="*";
//instance.defaults.headers.common["Access-Control-Allow-Methods"] ="DELETE, POST, GET, OPTIONS";
//instance.defaults.headers.common["Access-Control-Allow-Headers"] ="Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With";
 export default instance;