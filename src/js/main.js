import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

//Import pages, styles, files
import 'pages/index.html';
import 'bootstrap';
import 'modules/bootstrap/dist/css/bootstrap.min.css';
import 'scss/style.scss';

//import my components
import Explorer from './Components/Explorer';
import reducers from './reducers';

//init store
let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

//init App
let expPath = new URL(location.href).searchParams.get('path');
ReactDOM.render(
        <Provider store={store}>
            <Explorer path = {expPath || './'}/>
        </Provider>,
    document.querySelector('#main'));