import React                      from 'react';
import { renderToString }         from 'react-dom/server';
import { RouterContext }          from 'react-router';
import { Provider }               from 'react-redux';

export default function (store, renderProps) {
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
