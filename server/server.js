import express                   from 'express';
import React                     from 'react';
import { RoutingContext, match } from 'react-router';
import { renderToString }        from 'react-dom/server';

import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider }              from 'react-redux';

import path                      from 'path';
import createLocation            from 'history/lib/createLocation';
import routes                    from '../common/components/routes';

import * as reducers             from '../common/reducers';
import promiseMiddleware   from '../common/lib/promiseMiddleware';
import fetchComponentData from '../common/lib/fetchComponentData';

const app = express();

app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');

    function renderView() {

      const InitialComponent = (
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
      );
      const componentHTML = renderToString(InitialComponent);
      const initialState = store.getState();

      const HTML = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Isomorphic Redux Demo</title>

          <script type="application/javascript">
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
        </head>
        <body>
          <div id="react-view">${componentHTML}</div>
          <script type="application/javascript" src="/dist/bundle.js"></script>
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