import axios from 'axios';
import { wrapApiRequest } from '../../lib/cache';

const baseUrl = 'https://www.udacity.com/public-api/v0';
const resourceId = 'udacity';

export default function udacity() {
    return wrapApiRequest(`${resourceId}-courses`, {ttl: 7200}, () => {
        return axios.get(`${baseUrl}/courses`);
    })
    .then((response) => {
        const courses = (response.data.courses || []).map((item) => {
            return {
                id: item.key,
                title: item.title,
                source: resourceId
            }
        });
        this.items = this.items.concat(courses);
    })
    .catch((response) => {
        console.warn('Udacity Error', `${baseUrl}/courses`, response);
    });
}
