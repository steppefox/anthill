import axios from 'axios';
import params from './params';

export default function initialize () {
    axios.defaults.baseURL = params.backendURL;
}
