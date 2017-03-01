import { BASE_URL } from './index';
import {USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE} from '../constants';

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
