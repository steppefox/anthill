import axios from 'axios';
import { wrapApiRequest } from '../../lib/cache';

const baseUrl = 'https://api.coursera.org/api';
const resourceId = 'coursera';

export default function coursera() {
    return wrapApiRequest(`${resourceId}-courses`, {ttl: 7200}, () => {
        return axios.get(`${baseUrl}/courses.v1`)
    })
    .then((response) => {
        const courses = (response.data.elements || []).map((item) => {
           return {
               title: item.name,
               source: resourceId
           }
        });
        this.items = this.items.concat(courses);
    })
    .catch((response) => {
        console.warn('Coursera Error', response);
    });
}
