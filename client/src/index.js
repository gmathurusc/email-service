import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reducers from './reducers'
import reduxThunk from 'redux-thunk';
import axios from 'axios';
window.axios = axios;

// import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk)); //reducers, initial state, middleware


ReactDOM.render(
    <Provider store={ store }><App/></Provider>,
    document.querySelector('#root')
);




// registerServiceWorker();
