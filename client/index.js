import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';

import { fromJS }                       from 'immutable';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes      from '../common/components/routes';

import * as reducers                    from 'reducers';
import promiseMiddleware   from '../common/lib/promiseMiddleware';

const history = createBrowserHistory();

let initialState = window.__INITIAL_STATE__;
// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
//Object
//    .keys(initialState)
//    .forEach(key => {
//        initialState[key] = fromJS(initialState[key]);
//    });
const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
render(
    <Provider store={store}>
        <Router children={routes} history={history} />
    </Provider>,
    document.getElementById('react-view')
);
