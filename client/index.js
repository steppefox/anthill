import React       from 'react';
import { render }  from 'react-dom';
import { Router }  from 'react-router';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import { Provider }                     from 'react-redux';
import { browserHistory } from 'react-router'
import routes      from '../common/components/routes';

import * as reducers                    from '../common/reducers';
import promiseMiddleware   from '../common/lib/promiseMiddleware';

let initialState = window.__INITIAL_STATE__;

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);
render(
    <Provider store={store}>
        <Router children={routes} history={browserHistory} />
    </Provider>,
    document.getElementById('react-view')
);
