import { BASE_URL } from './index';
import {
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  USER_CREATE_SUCCESS, USER_CREATE_REQUEST, USER_CREATE_FAILURE,
  USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILURE,
  USER_DELETE_SUCCESS, USER_DELETE_REQUEST, USER_DELETE_FAILURE,
  USER_DETAIL_REQUEST, USER_DETAIL_FAILURE, USER_DETAIL_SUCCESS
} from '../constants';
import { grantPermission, revokePermission } from './permissions';

// Fetch Users
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

// User Creation
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

// User Edit
function userEditRequest() {
  return {
    type: USER_EDIT_REQUEST
  }
}

function userEditSuccess() {
  return {
    type: USER_EDIT_SUCCESS
  }
}

function userEditFailure(message) {
  return {
    type: USER_EDIT_FAILURE,
    message
  }
}

export function editUser(user) {
  console.log('called')
  const { id, permissions, old_permissions } = user;
  const id_token = localStorage.getItem('id_token')
  console.log(user)
  let config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(user)
  }

  return dispatch => {
    dispatch(userEditRequest())
    fetch(`${BASE_URL}user/user/${id}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(userEditFailure(json.message))
        console.log(json.message)
      } else {
        dispatch(userEditSuccess());
        console.log("success")
        permissions.forEach(permission => {
          if (!old_permissions.includes(permission)) {
            dispatch(grantPermission(permission, id));
          }
        })

        old_permissions.forEach(permission => {
          if (!permissions.includes(permission)) {
            dispatch(revokePermission(id, permission, false));
          }
        })
      }
    }).catch(err => console.log("Error: ", err))
  }
}

// User Delete
function userDeleteRequest() {
  return {
    type: USER_DELETE_REQUEST
  }
}

function userDeleteSuccess() {
  return {
    type: USER_DELETE_SUCCESS
  }
}

function userDeleteFailure(message) {
  return {
    type: USER_DELETE_FAILURE,
    message
  }
}

export function deleteUser(user_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(userDeleteRequest())
    fetch(`${BASE_URL}user/user/${user_id}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(userDeleteFailure(json.message))
      } else {
        dispatch(userDeleteSuccess());
      }
    }).catch(err => console.log("Error: ", err))
  }
}

// Fetch User Detail
function userDetailRequest() {
  return {
    type: USER_DETAIL_REQUEST
  }
}

function userDetailSuccess(user) {
  return {
    type: USER_DETAIL_SUCCESS,
    user
  }
}

function userDetailFailure(message) {
  return {
    type: USER_DETAIL_FAILURE,
    message
  }
}

export function fetchUserDetail(user_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(userDetailRequest())
    fetch(`${BASE_URL}user/user/${user_id}?nest-permissions=true`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(userDetailFailure(json.message))
      } else {
        const { user } = json;
        dispatch(userDetailSuccess(user));
      }
    }).catch(err => console.log("Error: ", err))
  }
}
