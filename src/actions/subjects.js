import { BASE_URL } from './index';
import {
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  SUBJECT_LISTING_SUCCESS, SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE,
} from '../constants';

function createSubjectRequest() {
  return {
    type: SUBJECT_CREATE_REQUEST
  }
}

function createSubjectSuccess() {
  return {
    type: SUBJECT_CREATE_SUCCESS,
    message: 'Created!'
  }
}

function createSubjectFailure(message) {
  return {
    type: SUBJECT_CREATE_FAILURE,
    message
  }
}

export function createSubject(name) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify({ name })
  }

  return dispatch => {
    dispatch(createSubjectRequest())
    fetch(`${BASE_URL}lessons/subject`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        console.log("ERROR", json.message)
        dispatch(createSubjectFailure(json.message))
      } else {
        console.log("SUCCESS")
        dispatch(createSubjectSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}

// Subject Listing functions

function subjectListingRequest() {
  return {
    type: SUBJECT_LISTING_REQUEST
  }
}

function subjectListingSuccess(subjects) {
  return {
    type: SUBJECT_LISTING_SUCCESS,
    subjects
  }
}

function subjectListingFailure(message) {
  return {
    type: SUBJECT_LISTING_FAILURE,
    message
  }
}


export function fetchSubjects() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(subjectListingRequest())
    return fetch(`${BASE_URL}lessons/subject`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(subjectListingFailure(json.message))
        } else {
          const { subjects } = json;
          dispatch(subjectListingSuccess(subjects))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
