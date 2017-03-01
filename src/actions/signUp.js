import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from '../constants';
import { BASE_URL } from './index';

function signUpRequest() {
  return {
    type: SIGNUP_REQUEST
  }
}

function signUpFailure(message) {
  return {
    type: SIGNUP_FAILURE,
    message
  }
}

function signUpSuccess() {
  return {
    type: SIGNUP_SUCCESS
  }
}

export function signUp(data) {
  const { first_name, last_name, email, username, password, school_name } = data;

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, first_name, last_name, email, school_name })
  }

  return dispatch => {
    dispatch(signUpRequest())
    fetch(`${BASE_URL}school/signup`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(signUpFailure(json.message))
      } else {
        dispatch(signUpSuccess());
      }
    }).catch(err => console.log("Error: ", err))
  }
}
