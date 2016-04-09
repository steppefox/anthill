import React     from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './index';

import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';

export default (
    <Route name="app" component={App} path="/">
        <IndexRoute component={Home} />
        <Route component={Home} path="home" />

        <Route path="*" component={NotFound} />
    </Route>
);
