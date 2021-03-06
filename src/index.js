import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index.js'

ReactDOM.render(
    <Provider store={createStore(rootReducer, applyMiddleware(thunk))}>
    <Router>
        <App />
    </Router>
    </Provider>,
    document.getElementById('root')
);
