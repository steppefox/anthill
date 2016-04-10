'use strict';

import coursera from './courses/coursera';
import udacity from './courses/udacity';
import khan from './courses/khan';

const courses = (req, res) => {
    const ret = {
        items: []
    };

    const promises = [
        coursera.call(ret),
        udacity.call(ret)

        // not sure about Khan Academy courses, cuz they're have no usual "courses",
        // only bunches of lessons on specific knowledges...

        // khan.call(ret)
    ];

    return Promise.all(promises).then((data) => {
        res.send(ret);
    });
}

export default courses;
