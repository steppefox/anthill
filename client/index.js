import React                        from 'react';
import { render }                   from 'react-dom';
import { Router, browserHistory }   from 'react-router';

import { applyMiddleware }          from 'redux';
import { createStore, compose }     from 'redux';
import { combineReducers }          from 'redux';
import { Provider }                 from 'react-redux';
import { syncHistoryWithStore }     from 'react-router-redux'
import { routerReducer }            from 'react-router-redux'

import routes                       from '../common/routes';
import initializeConfig             from '../common/config';
import reducers                     from '../common/reducers';
import promiseMiddleware            from '../common/middlewares/promiseMiddleware';

let initialState = window.__INITIAL_STATE__;

initializeConfig();

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

const middlewares = [
    promiseMiddleware
];

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
);

const history = syncHistoryWithStore(browserHistory, store);

history.listen((location) => {
    // do something usefull here
});

render(
    <Provider store={store}>
        <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);
