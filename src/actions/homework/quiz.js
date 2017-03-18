import { BASE_URL } from '../index';
import {
  ASSIGN_QUIZ_REQUEST, ASSIGN_QUIZ_FAILURE, ASSIGN_QUIZ_SUCCESS,
  SUBMIT_QUIZ_REQUEST, SUBMIT_QUIZ_SUCCESS, SUBMIT_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_SUBMISSION_REQUEST, FETCH_QUIZ_SUBMISSION_FAILURE, FETCH_QUIZ_SUBMISSION_SUCCESS,
} from '../../constants';

// Assign Quiz actions
function assignQuizRequest() {
  return {
    type: ASSIGN_QUIZ_REQUEST
  }
}

function assignQuizSuccess() {
  return {
    type: ASSIGN_QUIZ_SUCCESS,
    message: 'Assigned'
  }
}

function assignQuizFailure(message) {
  return {
    type: ASSIGN_QUIZ_FAILURE,
    message
  }
}

export function assignQuiz(quiz) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(quiz)
  }

  return dispatch => {
    dispatch(assignQuizRequest())
    fetch(`${BASE_URL}homework/quiz`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(assignQuizFailure(json.message))
      } else {
        dispatch(assignQuizSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}


// Submit Quiz
function submitQuizRequest() {
  return {
    type: SUBMIT_QUIZ_REQUEST
  }
}

function submitQuizFailure(message) {
  return {
    type: SUBMIT_QUIZ_FAILURE,
    message
  }
}

function submitQuizSuccess() {
  return {
    type: SUBMIT_QUIZ_SUCCESS,
  }
}


export function submitQuiz(submission, quizId) {
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
    dispatch(submitQuizRequest())
    fetch(`${BASE_URL}homework/quiz/${quizId}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(submitQuizFailure(json.message))
      } else {
        dispatch(submitQuizSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}

// Fetch Quiz
function fetchQuizRequest() {
  return {
    type: FETCH_QUIZ_REQUEST
  }
}

function fetchQuizFailure(message) {
  return {
    type: FETCH_QUIZ_FAILURE,
    message
  }
}

function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}


export function fetchQuiz(quizId) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchQuizRequest())
    return fetch(`${BASE_URL}homework/quiz/${quizId}`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(fetchQuizFailure(json.message))
        } else {
          const { quiz } = json;
          dispatch(fetchQuizSuccess(quiz))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}


// Fetch Quiz Submission
function fetchQuizSubmissionRequest() {
  return {
    type: FETCH_QUIZ_SUBMISSION_REQUEST
  }
}

function fetchQuizSubmissionFailure(message) {
  return {
    type: FETCH_QUIZ_SUBMISSION_FAILURE,
    message
  }
}

function fetchQuizSubmissionSuccess(submission) {
  return {
    type: FETCH_QUIZ_SUBMISSION_SUCCESS,
    submission
  }
}

export function fetchQuizSubmission(submissionId) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchQuizSubmissionRequest())
    return fetch(`${BASE_URL}homework/quiz/submission/${submissionId}`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(fetchQuizSubmissionFailure(json.message))
        } else {
          const { submission } = json;
          dispatch(fetchQuizSubmissionSuccess(submission))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}