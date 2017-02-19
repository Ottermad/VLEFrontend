import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_REQUEST, LOGOUT_SUCCESS,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  USER_CREATE_SUCCESS, USER_CREATE_REQUEST, USER_CREATE_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS,
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  LESSON_LISTING_REQUEST, LESSON_LISTING_FAILURE, LESSON_LISTING_SUCCESS,
  SUBJECT_LISTING_SUCCESS, SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE,
  LESSON_CREATE_REQUEST, LESSON_CREATE_SUCCESS, LESSON_CREATE_FAILURE,
  LESSON_TAUGHT_LISTING_REQUEST, LESSON_TAUGHT_LISTING_FAILURE, LESSON_TAUGHT_LISTING_SUCCESS,
  LESSON_DETAIL_REQUEST, LESSON_DETAIL_SUCCESS, LESSON_DETAIL_FAILURE,
  ASSIGN_ESSAY_REQUEST, ASSIGN_ESSAY_FAILURE, ASSIGN_ESSAY_SUCCESS,
  HOMEWORK_LESSON_DUE_REQUEST, HOMEWORK_LESSON_DUE_FAILURE, HOMEWORK_LESSON_DUE_SUCCESS
} from '../constants';
import { browserHistory } from 'react-router';

const BASE_URL = 'http://0.0.0.0:8000/'

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function receiveLogin(id_token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token
  }
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
    browserHistory.replace("/login")
  }
}


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
          console.log(permissions)
          dispatch(fetchPerimissionsSuccess(permissions))
        }
      })
      .catch(err => console.log("Error: ", err))
  }
}


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

function grantPermission(permission_id, user_id) {
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


// Homework for lesson
// Lesson Detail
function homeworkForLessonRequest() {
  return {
    type: HOMEWORK_LESSON_DUE_REQUEST
  }
}

function homeworkForLessonSuccess(homework) {
  return {
    type: HOMEWORK_LESSON_DUE_SUCCESS,
    homework
  }
}

function homeworkForLessonFailure(message) {
  return {
    type: HOMEWORK_LESSON_DUE_FAILURE,
    message
  }
}

export function fetchHomeworkForLesson(lesson_id) {

}
