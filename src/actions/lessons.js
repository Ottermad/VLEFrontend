import { BASE_URL } from './index';
import {
  LESSON_LISTING_REQUEST, LESSON_LISTING_FAILURE, LESSON_LISTING_SUCCESS,
  LESSON_CREATE_REQUEST, LESSON_CREATE_SUCCESS, LESSON_CREATE_FAILURE,
  LESSON_TAUGHT_LISTING_REQUEST, LESSON_TAUGHT_LISTING_FAILURE, LESSON_TAUGHT_LISTING_SUCCESS,
  LESSON_DETAIL_REQUEST, LESSON_DETAIL_SUCCESS, LESSON_DETAIL_FAILURE,
  LESSON_DELETE_REQUEST, LESSON_DELETE_SUCCESS, LESSON_DELETE_FAILURE
} from '../constants';

// Lesson Listing functions

function lessonListingRequest() {
  return {
    type: LESSON_LISTING_REQUEST
  }
}

function lessonListingSuccess(lessons) {
  return {
    type: LESSON_LISTING_SUCCESS,
    lessons
  }
}

function lessonListingFailure(message) {
  return {
    type: LESSON_LISTING_FAILURE,
    message
  }
}

export function fetchLessons() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(lessonListingRequest())
    return fetch(`${BASE_URL}lessons/lesson`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(lessonListingFailure(json.message))
        } else {
          const { lessons } = json;
          dispatch(lessonListingSuccess(lessons))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}


// Lesson Create actions
function createLessonRequest() {
  return {
    type: LESSON_CREATE_REQUEST
  }
}

function createLessonSuccess() {
  return {
    type: LESSON_CREATE_SUCCESS,
    message: 'Created!'
  }
}

function createLessonFailure(message) {
  return {
    type: LESSON_CREATE_FAILURE,
    message
  }
}


export function createLesson(lesson) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(lesson)
  }

  return dispatch => {
    dispatch(createLessonRequest())
    fetch(`${BASE_URL}lessons/lesson`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(createLessonFailure(json.message))
      } else {
        dispatch(createLessonSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}


// Lessons Taught Listing functions

function lessonsTaughtListingRequest() {
  return {
    type: LESSON_TAUGHT_LISTING_REQUEST
  }
}

function lessonsTaughtListingSuccess(lessons) {
  return {
    type: LESSON_TAUGHT_LISTING_SUCCESS,
    lessons
  }
}

function lessonsTaughtListingFailure(message) {
  return {
    type: LESSON_TAUGHT_LISTING_FAILURE,
    message
  }
}

export function fetchLessonsTaught() {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(lessonsTaughtListingRequest())
    return fetch(`${BASE_URL}lessons/lesson/taught?nest-subject=true`, config)
      .then(response => response.json())
      .then(json => {
        if ("error" in json) {
          dispatch(lessonsTaughtListingFailure(json.message))
        } else {
          const { lessons } = json;
          dispatch(lessonsTaughtListingSuccess(lessons))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}

// Lesson Detail
function lessonDetailRequest() {
  return {
    type: LESSON_DETAIL_REQUEST
  }
}

function lessonDetailSuccess(lesson) {
  return {
    type: LESSON_DETAIL_SUCCESS,
    lesson
  }
}

function lessonDetailFailure(message) {
  return {
    type: LESSON_DETAIL_FAILURE,
    message
  }
}

export function fetchLesson(id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(lessonDetailRequest())
    return fetch(`${BASE_URL}lessons/lesson/${id}?nest-teachers=true&nest-students=true&nest-subject=true&nest-homework=true`, config)
      .then(response => response.json().then(json => ({json, response})))
      .then(({json, response}) => {
        if (response.status === 404) {
          dispatch(lessonDetailFailure(`Lesson with id: ${id} not found.`))
        }
        else if ("error" in json) {
          dispatch(lessonDetailFailure(json.message))
        } else {
          const { lesson } = json;
          dispatch(lessonDetailSuccess(lesson))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}


// Lesson Delete
function lessonDeleteRequest() {
  return {
    type: LESSON_DELETE_REQUEST
  }
}

function lessonDeleteSuccess() {
  return {
    type: LESSON_DELETE_SUCCESS
  }
}

function lessonDeleteFailure(message) {
  return {
    type: LESSON_DELETE_FAILURE,
    message
  }
}

export function deleteLesson(lesson_id) {
  const id_token = localStorage.getItem('id_token')
  let config = {
    method: 'DELETE',
    headers: {
      'Authorization': `JWT ${id_token}`
    },
  }

  return dispatch => {
    dispatch(lessonDeleteRequest())
    fetch(`${BASE_URL}lessons/lesson/${lesson_id}`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(lessonDeleteFailure(json.message))
      } else {
        dispatch(lessonDeleteSuccess());
      }
    }).catch(err => console.log("Error: ", err))
  }
}