import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import configureStore from './store/configureStore';

import './static/css/common.less';
import './static/css/font.css';

const store=configureStore();

import RouteMap from './router/routerMap.jsx';

render(
    <Provider store={store}>
        <RouteMap history={hashHistory}></RouteMap>
    </Provider>,
    document.getElementById('root')
)
