import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  USER_CREATE_SUCCESS, USER_CREATE_REQUEST, USER_CREATE_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS
} from '../constants';
import { browserHistory } from 'react-router';

const BASE_URL = 'http://0.0.0.0:8000/'

export function requestLogin(creds) {
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

export function loginError(message) {
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
    dispatch(receiveLogout())
    browserHistory.replace("/login")
  }
}


export function requestUsers() {
  return {
    type: USERS_REQUEST
  }
}

export function usersError(message) {
  return {
    type: USERS_FAILURE,
    message
  }
}

export function usersFetched(users) {
  return {
    type: USERS_SUCCESS,
    users
  }
}

export function fetchUsers() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }


  // We dispatch requestLogin to kickoff the call to the API
  return dispatch => {
    dispatch(requestUsers())

    fetch(`${BASE_URL}user/user?nest-permissions=true`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(usersError(json.message))
        } else {
          const { users } = json;
          dispatch(usersFetched(users))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

export function fetchPerimissionsRequest() {
  return {
    type: FETCH_PERMISSIONS_REQUEST
  }
}

export function fetchPerimissionsError(message) {
  return {
    type: FETCH_PERMISSIONS_FAILURE,
    message
  }
}

export function fetchPerimissionsSuccess(permissions) {
  return {
    type: FETCH_PERMISSIONS_SUCCESS,
    permissions
  }
}


export function userCreateRequest() {
  return {
    type: USER_CREATE_REQUEST
  }
}

export function userCreateSuccess(userCreated) {
  return {
    type: USER_CREATE_SUCCESS,
    userCreated
  }
}

export function userCreateFailure(message) {
  return {
    type: USER_CREATE_FAILURE,
    message
  }
}

export function createUser(user) {
  const { first_name, last_name, email, username, password, permissions } = user;
  const id_token = localStorage.getItem('id_token')
  console.log(user)
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify({ username, password, first_name, last_name, email })
  }

  return dispatch => {
    dispatch(userCreateRequest())
    fetch(`${BASE_URL}user/user`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(userCreateFailure(json.message))
      } else {
        const { user } = json;
        dispatch(userCreateSuccess(user));
        permissions.forEach(permission => {
          console.log('permission', permission)
          dispatch(grantPermission(permission, user.id));
        });
      }
    }).catch(err => console.log("Error: ", err))
  }
}

function grantPermission(permission_id, user_id) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify({ permission_id, user_id })
  }

  return dispatch => {
    dispatch(grantPermissionRequest())
    fetch(`${BASE_URL}permissions/permission/grant`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        console.log("ERROR", json.message)
        dispatch(grantPermissionFailure(json.message))
      } else {
        console.log("SUCCESS")
        dispatch(grantPermissionSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}


export function grantPermissionRequest() {
  return {
    type: GRANT_PERMISSION_REQUEST
  }
}

export function grantPermissionSuccess() {
  return {
    type: GRANT_PERMISSION_SUCCESS,
  }
}

export function grantPermissionFailure(message) {
  return {
    type: GRANT_PERMISSION_FAILURE,
    message
  }
}
