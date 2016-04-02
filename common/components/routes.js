import React     from 'react';
import { Route } from 'react-router';
import App from './index';
import Home from './Home/Home';

export default (
  <Route name="app" component={App} path="/">
    <Route component={Home} path="home" />
  </Route>
);
