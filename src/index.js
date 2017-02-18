import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';

import {receiveLogin} from './actions';

import {requireAuthentication} from './components/AuthenticatedComponent';

import App from './containers/App';
import Main from './containers/Main'
import Login from './containers/Login';
import UserListing from './containers/UserListing';
import UserCreation from './containers/UserCreation';
import SubjectCreation from './containers/SubjectCreation';

import thunkMiddleware from 'redux-thunk'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
let store = createStoreWithMiddleware(reducer)

const rootElement = document.getElementById('root');

let token = localStorage.getItem('id_token');
if (token !== null) {
  store.dispatch(receiveLogin(token));
}

ReactDOM.render(
  <Provider store={store}>
    <Router  path="/" history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/home" component={requireAuthentication(Main)}/>
        <Route path="/users" component={requireAuthentication(UserListing)} />
        <Route path="/users/create" component={requireAuthentication(UserCreation)}/>
        <Route path="/subjects/create/" component={requireAuthentication(SubjectCreation)} />
        <Route path="login" component={Login} />
      </Route>
    </Router>
  </Provider>,
  rootElement
);
