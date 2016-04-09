'use strict';

import coursera from './courses/coursera';
import khan from './courses/khan';

const courses = (req, res) => {
    const ret = {
        items: []
    };

    const promises = [
        coursera.call(ret)
        //khan.call(ret)
    ];

    return Promise.all(promises).then((data) => {
        res.send(ret);
    });
}

export default courses;
