import { BASE_URL } from './index';
import {
  FETCH_SUBMISSIONS_REQUEST, FETCH_SUBMISSIONS_FAILURE, FETCH_SUBMISSIONS_SUCCESS,
  HOMEWORK_DUE_REQUEST, HOMEWORK_DUE_SUCCESS, HOMEWORK_DUE_FAILURE,
} from '../../constants';

// Fetch Submissions
function fetchSubmissionsRequest() {
  return {
    type: FETCH_SUBMISSIONS_REQUEST
  }
}

function fetchSubmissionsFailure(message) {
  return {
    type: FETCH_SUBMISSIONS_FAILURE,
    message
  }
}

function fetchSubmissionsSuccess(submissions) {
  return {
    type: FETCH_SUBMISSIONS_SUCCESS,
    submissions
  }
}

export function fetchSubmissions(homeworkId) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(fetchSubmissionsRequest())
    return fetch(`${BASE_URL}homework/homework/${homeworkId}/submissions`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(fetchSubmissionsFailure(json.message))
        } else {
          const { submissions } = json;
          dispatch(fetchSubmissionsSuccess(submissions))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// Homework
function homeworkDueRequest() {
  return {
    type: HOMEWORK_DUE_REQUEST
  }
}

function homeworkDueFailure(message) {
  return {
    type: HOMEWORK_DUE_FAILURE,
    message
  }
}

function homeworkDueSuccess(homework) {
  return {
    type: HOMEWORK_DUE_SUCCESS,
    homework
  }
}

export function fetchHomeworkDue() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(homeworkDueRequest())
    return fetch(`${BASE_URL}homework/summary?nest-lessons=true`, config)
      .then(response => response.json())
      .then(json => {
        console.log(json)
        if ("error" in json) {
          dispatch(homeworkDueFailure(json.message))
        } else {
          const { homework } = json;
          dispatch(homeworkDueSuccess(homework))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}
