import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';

import {receiveLogin, fetchCurrentUserDetailsSuccess} from './actions/auth';

import {requireAuthentication} from './components/AuthenticatedComponent';

import App from './containers/App';
import Main from './containers/Main'

import Login from './containers/Login';

import UserListing from './containers/UserListing';
import UserCreation from './containers/UserCreation';
import UserEdit from './containers/UserEdit';

import SubjectCreation from './containers/SubjectCreation';
import SubjectListing from './containers/SubjectListing';
import SubjectEdit from './containers/SubjectEdit';

import LessonListing from './containers/LessonListing';
import LessonCreation from './containers/LessonCreation';
import TeacherLessonListing from './containers/TeacherLessonListing';
import LessonDetail from './containers/LessonDetail';

import AssignEssay from './containers/AssignEssay';
import HomeworkDue from './containers/HomeworkDue';
import SubmitEssay from './containers/SubmitEssay';
import SubmissionsListing from './containers/SubmissionsListing';
import ViewEssay from './containers/ViewEssay';
import SchoolSignUp from './containers/SchoolSignUp';

import thunkMiddleware from 'redux-thunk'

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)
let store = createStoreWithMiddleware(reducer)

const rootElement = document.getElementById('root');

let token = localStorage.getItem('id_token');
let currentUser = localStorage.getItem('currentUser');
if (token !== null && currentUser !== null) {
  store.dispatch(receiveLogin(token));
  store.dispatch(fetchCurrentUserDetailsSuccess(JSON.parse(currentUser)))
}

ReactDOM.render(
  <Provider store={store}>
    <Router  path="/" history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="home" component={requireAuthentication(Main)}/>
        <Route path="admin">
          <Route path="users" component={requireAuthentication(UserListing)} />
          <Route path="users/create" component={requireAuthentication(UserCreation)}/>
          <Route path="users/edit/:id" component={requireAuthentication(UserEdit)}/>
          <Route path="subjects" component={requireAuthentication(SubjectListing)}/>
          <Route path="subjects/create" component={requireAuthentication(SubjectCreation)} />
          <Route path="subjects/edit/:id" component={requireAuthentication(SubjectEdit)} />
          <Route path="lessons" component={requireAuthentication(LessonListing)}/>
          <Route path="lessons/create" component={requireAuthentication(LessonCreation)} />
        </Route>
        <Route path="teacher">
          <Route path="lessons" component={requireAuthentication(TeacherLessonListing)} />
          <Route path="lessons/:id" component={requireAuthentication(LessonDetail)} />
          <Route path="assign">
            <Route path="essay" component={requireAuthentication(AssignEssay)}/>
          </Route>
          <Route path="homework/:id/submissions" component={requireAuthentication(SubmissionsListing)}/>
          <Route path="submissions/essay/:id" component={requireAuthentication(ViewEssay)}/>
        </Route>
        <Route path="student">
          <Route path="homework" component={requireAuthentication(HomeworkDue)} />
          <Route path="submit">
            <Route path="essay/:id" component={requireAuthentication(SubmitEssay)}/>
          </Route>
        </Route>
        <Route path="login" component={Login} />
        <Route path="signup" component={SchoolSignUp} />
      </Route>
    </Router>
  </Provider>,
  rootElement
);
