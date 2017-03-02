import { BASE_URL } from './index';
import {
  ASSIGN_ESSAY_REQUEST, ASSIGN_ESSAY_FAILURE, ASSIGN_ESSAY_SUCCESS,
  FETCH_ESSAY_REQUEST, FETCH_ESSAY_SUCCESS, FETCH_ESSAY_FAILURE,
  SUBMIT_ESSAY_REQUEST, SUBMIT_ESSAY_SUCCESS, SUBMIT_ESSAY_FAILURE,
  FETCH_ESSAY_SUBMISSION_REQUEST, FETCH_ESSAY_SUBMISSION_FAILURE, FETCH_ESSAY_SUBMISSION_SUCCESS
} from '../../constants';

// Assign Essay actions
function assignEssayRequest() {
  return {
    type: ASSIGN_ESSAY_REQUEST
  }
}

function assignEssaySuccess() {
  return {
    type: ASSIGN_ESSAY_SUCCESS,
    message: 'Assigned'
  }
}

function assignEssayFailure(message) {
  return {
    type: ASSIGN_ESSAY_FAILURE,
    message
  }
}

export function assignEssay(essay) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(essay)
  }

  return dispatch => {
    dispatch(assignEssayRequest())
    fetch(`${BASE_URL}homework/essay`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(assignEssayFailure(json.message))
      } else {
        dispatch(assignEssaySuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}

// Fetch Essay
function fetchEssayRequest() {
  return {
    type: FETCH_ESSAY_REQUEST
  }
}

function fetchEssayFailure(message) {
  return {
    type: FETCH_ESSAY_FAILURE,
    message
  }
}

function fetchEssaySuccess(essay) {
  return {
    type: FETCH_ESSAY_SUCCESS,
    essay
  }
}


export function fetchEssay(essayId) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchEssayRequest())
    return fetch(`${BASE_URL}homework/essay/${essayId}`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(fetchEssayFailure(json.message))
        } else {
          const { essay } = json;
          dispatch(fetchEssaySuccess(essay))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}


// Submit Essay
function submitEssayRequest() {
  return {
    type: SUBMIT_ESSAY_REQUEST
  }
}

function submitEssayFailure(message) {
  return {
    type: SUBMIT_ESSAY_FAILURE,
    message
  }
}

function submitEssaySuccess() {
  return {
    type: SUBMIT_ESSAY_SUCCESS,
  }
}


export function submitEssay(submission, essayId) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(submission)
  }

  return dispatch => {
    dispatch(submitEssayRequest())
    fetch(`${BASE_URL}homework/essay/${essayId}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(submitEssayFailure(json.message))
      } else {
        dispatch(submitEssaySuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}




// Fetch Essay Submission
function fetchEssaySubmissionRequest() {
  return {
    type: FETCH_ESSAY_SUBMISSION_REQUEST
  }
}

function fetchEssaySubmissionFailure(message) {
  return {
    type: FETCH_ESSAY_SUBMISSION_FAILURE,
    message
  }
}

function fetchEssaySubmissionSuccess(submission) {
  return {
    type: FETCH_ESSAY_SUBMISSION_SUCCESS,
    submission
  }
}

export function fetchEssaySubmission(submissionId) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchEssaySubmissionRequest())
    return fetch(`${BASE_URL}homework/essay/submission/${submissionId}`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(fetchEssaySubmissionFailure(json.message))
        } else {
          const { submission } = json;
          dispatch(fetchEssaySubmissionSuccess(submission))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
