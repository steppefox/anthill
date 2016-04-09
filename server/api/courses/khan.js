import axios from 'axios';

const baseUrl = 'http://www.khanacademy.org/api/v1/';

export default function coursera() {
    axios.get(`${baseUrl}/courses.v1`)
        .then((response) => {
            ret.items = response.data.elements;
        })
        .catch((response) => {
            console.log(response);
        });
}