import axios from 'axios';

const baseUrl = 'https://api.coursera.org/api';

export default function coursera() {
    return axios.get(`${baseUrl}/courses.v1`)
        .then((response) => {
            this.items = this.items.concat(response.data.elements);
        })
        .catch((response) => {
            console.warn('Coursera Error', response);
        });
}