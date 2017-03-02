import { BASE_URL } from './index';
import {
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS
} from '../constants';

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
  console.log('dispatching success')
  return {
    type: FETCH_PERMISSIONS_SUCCESS,
    permissions
  }
}


export function fetchPermissions() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(fetchPerimissionsRequest())
    return fetch(`${BASE_URL}permissions/permission`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          console.log("error", json.message)
          dispatch(fetchPerimissionsError(json.message))
        } else {
          const { permissions } = json;
          console.log("permissions", permissions)
          dispatch(fetchPerimissionsSuccess(permissions))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

export function grantPermission(permission_id, user_id) {
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
