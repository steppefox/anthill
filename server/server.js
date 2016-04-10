import express                    from 'express';
import React                      from 'react';
import { match }                  from 'react-router';

import { applyMiddleware }        from 'redux';
import { createStore }            from 'redux';
import { combineReducers }        from 'redux';
import { routerReducer }          from 'react-router-redux'

import path                       from 'path';
import axios                      from 'axios';
import createLocation             from 'history/lib/createLocation';

import config                     from '../common/config/params';
import routes                     from '../common/routes';
import * as reducers              from '../common/reducers';
import promiseMiddleware          from '../common/middlewares/promiseMiddleware';
import fetchComponentData         from '../common/lib/fetchComponentData';
import template                   from './template';
import apiRoutes                  from './api';

const app = express();
const apiPrefix = '/api';

var PORT = process.env.PORT || 3000;

// Define basic server stuff
app.enable('trust proxy');
app.disable('etag');
app.disable('x-powered-by');
axios.defaults.baseURL = 'http://127.0.0.1:' + PORT + config.backendURL;

app.use(express.static(path.join(__dirname, '../static')));

// Define api routes
app.get(apiPrefix+'/courses', apiRoutes.courses);

// Define other routes for Isomorphic Redux
app.use((req, res) => {
  console.info('Request Url', req.url);

  const location = createLocation(req.url);

  const reducer  = combineReducers({
    ...reducers.default,
    routing: routerReducer
  });

  const store = createStore(
    reducer,
    {},
    applyMiddleware(promiseMiddleware)
  );

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if (!renderProps) return res.status(404).end('Not found.');

    const renderView = template.bind(null, store, renderProps);

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
