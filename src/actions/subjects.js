import { BASE_URL } from './index';
import {
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  SUBJECT_LISTING_SUCCESS, SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE,
  SUBJECT_DELETE_REQUEST, SUBJECT_DELETE_SUCCESS, SUBJECT_DELETE_FAILURE,
  SUBJECT_EDIT_REQUEST, SUBJECT_EDIT_SUCCESS, SUBJECT_EDIT_FAILURE,
  SUBJECT_DETAIL_FAILURE, SUBJECT_DETAIL_SUCCESS, SUBJECT_DETAIL_REQUEST
} from '../constants';

// Subject creation
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


// Subject Delete
function subjectDeleteRequest() {
  return {
    type: SUBJECT_DELETE_REQUEST
  }
}

function subjectDeleteSuccess() {
  return {
    type: SUBJECT_DELETE_SUCCESS
  }
}

function subjectDeleteFailure(message) {
  return {
    type: SUBJECT_DELETE_FAILURE,
    message
  }
}

export function deleteSubject(subject_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(subjectDeleteRequest())
    fetch(`${BASE_URL}lessons/subject/${subject_id}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(subjectDeleteFailure(json.message))
      } else {
        dispatch(subjectDeleteSuccess());
      }
    }).catch(err => console.log("Error: ", err))
  }
}


// Subject Editing
function subjectEditRequest() {
  return {
    type: SUBJECT_EDIT_REQUEST
  }
}

function subjectEditSuccess() {
  return {
    type: SUBJECT_EDIT_SUCCESS
  }
}

function subjectEditFailure(message) {
  return {
    type: SUBJECT_EDIT_FAILURE,
    message
  }
}

export function editSubject(subject, subject_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(subject)
  }

  return dispatch => {
    dispatch(subjectEditRequest())
    fetch(`${BASE_URL}lessons/subject/${subject_id}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(subjectEditFailure(json.message))
      } else {
        dispatch(subjectEditSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}


// Subject Detail
function subjectDetailRequest() {
  return {
    type: SUBJECT_DETAIL_REQUEST
  }
}

function subjectDetailSuccess(subject) {
  return {
    type: SUBJECT_DETAIL_SUCCESS,
    subject
  }
}

function subjectDetailFailure(message) {
  return {
    type: SUBJECT_DETAIL_FAILURE,
    message
  }
}


export function subjectDetail(subject_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(subjectDetailRequest())
    return fetch(`${BASE_URL}lessons/subject/${subject_id}`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(subjectDetailFailure(json.message))
        } else {
          const { subject } = json;
          console.log(subject)
          dispatch(subjectDetailSuccess(subject))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
