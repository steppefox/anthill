import request from 'axios';

export function getCourses() {
    return {
        type: 'GET_COURSES',
        promise: request.get('/courses')
    };
}
