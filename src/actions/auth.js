import { BASE_URL } from './index';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  FETCH_CURRENT_USER_DETAILS_REQUEST, FETCH_CURRENT_USER_DETAILS_FAILURE, FETCH_CURRENT_USER_DETAILS_SUCCESS, REMOVE_CURRENT_USER_DETAILS
} from '../constants';
import { browserHistory } from 'react-router';

export function loginUser(creds) {
  const { username, password } = creds
  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  return dispatch => {
    if (username ===  "" || password === "") {
      dispatch(loginError("Username and password can't be blank."));
      return
    }

    dispatch(requestLogin({ username, password }))
    return fetch(`${BASE_URL}auth`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(loginError(json.message))
        } else {
          const { access_token } = json;
          localStorage.setItem('id_token', access_token);
          dispatch(receiveLogin(access_token))
          dispatch(fetchCurrentUserDetails())
          browserHistory.replace("/home")
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(id_token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('currentUser')
    dispatch(receiveLogout())
    dispatch(removeCurrentUserDetails())
    browserHistory.replace("/login")
  }
}

// Fetch Current User Details
function fetchCurrentUserDetailsRequest() {
  return {
    type: FETCH_CURRENT_USER_DETAILS_REQUEST
  }
}

function fetchCurrentUserDetailsFailure(message) {
  return {
    type: FETCH_CURRENT_USER_DETAILS_FAILURE,
    message
  }
}

function removeCurrentUserDetails() {
  return {
    type: REMOVE_CURRENT_USER_DETAILS,
  }
}

export function fetchCurrentUserDetailsSuccess(user) {
  return {
    type: FETCH_CURRENT_USER_DETAILS_SUCCESS,
    user
  }
}

export function fetchCurrentUserDetails() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchCurrentUserDetailsRequest())
    return fetch(`${BASE_URL}user/me?nest-permissions=true`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(fetchCurrentUserDetailsFailure(json.message))
        } else {
          const { user } = json;
          user.isTeacher = user.permissions.some(permission => {
            return permission.name === "Teacher";
          });
          user.isAdmin = user.permissions.some(permission => {
            return permission.name === "Administrator";
          });
          user.isStudent = user.permissions.some(permission => {
            return permission.name === "Student";
          });
          localStorage.setItem('currentUser', JSON.stringify(user))
          dispatch(fetchCurrentUserDetailsSuccess(user))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
