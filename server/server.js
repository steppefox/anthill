import express                    from 'express';
import React                      from 'react';
import { RouterContext, match }   from 'react-router';
import { renderToString }         from 'react-dom/server';

import { applyMiddleware }        from 'redux';
import { createStore }            from 'redux';
import { combineReducers }        from 'redux';
import { Provider }               from 'react-redux';
import { routerReducer }          from 'react-router-redux'

import path                       from 'path';
import axios                      from 'axios';
import createLocation             from 'history/lib/createLocation';

import config                     from '../common/config/params';
import routes                     from '../common/routes';
import * as reducers              from '../common/reducers';
import promiseMiddleware          from '../common/middlewares/promiseMiddleware';
import fetchComponentData         from '../common/lib/fetchComponentData';

import apiRoutes                  from './api';

const app = express();
const apiPrefix = '/api';

app.enable('trust proxy');
app.disable('etag');
app.disable('x-powered-by');
axios.defaults.baseURL = 'http://localhost:3000' + config.backendURL;

app.use(express.static(path.join(__dirname, '../static')));

app.get(apiPrefix+'/courses', apiRoutes.courses);

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

    function renderView() {

      const InitialComponent = (
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
      );
      const componentHTML = renderToString(InitialComponent);
      const initialState = store.getState();

      const HTML = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Anthill</title>

          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/static/bundle.js"></script>
        </body>
      </html>`;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export default app;
