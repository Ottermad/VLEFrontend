import { combineReducers } from 'redux'
import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS,
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE, SUBJECT_LISTING_SUCCESS,
  LESSON_LISTING_REQUEST, LESSON_LISTING_FAILURE, LESSON_LISTING_SUCCESS,
  LESSON_TAUGHT_LISTING_REQUEST, LESSON_TAUGHT_LISTING_FAILURE, LESSON_TAUGHT_LISTING_SUCCESS,
  LESSON_CREATE_REQUEST, LESSON_CREATE_SUCCESS, LESSON_CREATE_FAILURE,
  LESSON_DETAIL_REQUEST, LESSON_DETAIL_SUCCESS, LESSON_DETAIL_FAILURE,
  ASSIGN_ESSAY_REQUEST, ASSIGN_ESSAY_FAILURE, ASSIGN_ESSAY_SUCCESS,
  FETCH_CURRENT_USER_DETAILS_REQUEST, FETCH_CURRENT_USER_DETAILS_FAILURE, FETCH_CURRENT_USER_DETAILS_SUCCESS, REMOVE_CURRENT_USER_DETAILS,
  HOMEWORK_DUE_REQUEST, HOMEWORK_DUE_SUCCESS, HOMEWORK_DUE_FAILURE,
  FETCH_ESSAY_REQUEST, FETCH_ESSAY_SUCCESS, FETCH_ESSAY_FAILURE,
  SUBMIT_ESSAY_REQUEST, SUBMIT_ESSAY_SUCCESS, SUBMIT_ESSAY_FAILURE,
  FETCH_SUBMISSIONS_REQUEST, FETCH_SUBMISSIONS_FAILURE, FETCH_SUBMISSIONS_SUCCESS,
  FETCH_ESSAY_SUBMISSION_REQUEST, FETCH_ESSAY_SUBMISSION_FAILURE, FETCH_ESSAY_SUBMISSION_SUCCESS
} from '../constants'


// Sign Up reducer
function signUp(state = {}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        isFetching: false,
        hasFailed: true,
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        hasFailed: false,
      })
    default:
      return state;
  }
}
// The auth reducer. The starting state sets authentication
// based on a token being in local storage.
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    id_token: localStorage.getItem('id_token')
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        id_token: action.id_token
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}


function usersListing(state = {users: []}, action) {
  switch (action.type) {
    case USERS_REQUEST:
        return state;
    case USERS_SUCCESS:
      return Object.assign({}, state, {
        users: action.users
      })
    case USERS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      })
    default:
      return state
  }
}


function permissionsListing(state = {permissions: []}, action) {
  switch (action.type) {
    case FETCH_PERMISSIONS_REQUEST:
      return state;
    case FETCH_PERMISSIONS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    case FETCH_PERMISSIONS_SUCCESS:
      return Object.assign({}, state, {
        permissions: action.permissions
      })
    default:
      return state;

  }
}


function userCreate(state = {createdUser: {}}, action) {
  switch (action.type) {
    case USER_CREATE_REQUEST:
      return state;
    case USER_CREATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    case USER_CREATE_SUCCESS:
      return Object.assign({}, state, {
        createdUser: action.createdUser
      })
    default:
      return state;

  }
}


function grantPermission(state = {}, action) {
  switch (action.type) {
    case GRANT_PERMISSION_REQUEST:
      return state;
    case GRANT_PERMISSION_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    case GRANT_PERMISSION_SUCCESS:
      return state;
    default:
      return state;

  }
}

function createSubject(state = {successMessage: '', errorMessage: ''}, action) {
  switch (action.type) {
    case SUBJECT_CREATE_REQUEST:
      return state;
    case SUBJECT_CREATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case SUBJECT_CREATE_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: ''
      })
    default:
      return state;

  }
}

function subjectListing(state = {subjects: []}, action) {
  switch(action.type) {
    case SUBJECT_LISTING_REQUEST:
      return state;
    case SUBJECT_LISTING_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case SUBJECT_LISTING_SUCCESS:
      return Object.assign({}, state, {
        subjects: action.subjects
      })
    default:
      return state;
  }
}


function lessonListing(state = {lessons: []}, action) {
  switch(action.type) {
    case LESSON_LISTING_REQUEST:
      return state;
    case LESSON_LISTING_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_LISTING_SUCCESS:
      return Object.assign({}, state, {
        lessons: action.lessons
      })
    default:
      return state;
  }
}

function createLesson(state = {successMessage: '', errorMessage: '', lessons: []}, action) {
  switch (action.type) {
    case LESSON_CREATE_REQUEST:
      return state;
    case LESSON_CREATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case LESSON_CREATE_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: '',
        lessons: action.lessons
      })
    default:
      return state;

  }
}

function lessonsTaughtListing(state = {lessons: []}, action) {
  switch(action.type) {
    case LESSON_TAUGHT_LISTING_REQUEST:
      return state;
    case LESSON_TAUGHT_LISTING_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_TAUGHT_LISTING_SUCCESS:
      return Object.assign({}, state, {
        lessons: action.lessons
      })
    default:
      return state;
  }
}

function lessonDetail(state = {lesson: {name: '', homework: [], teachers: [], students: [], subject: {name: ''}}}, action) {
  switch(action.type) {
    case LESSON_DETAIL_REQUEST:
      return state;
    case LESSON_DETAIL_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        lesson: action.lesson,
      });
    default:
      return state;
  }
}

function assignEssay(state = {}, action) {
  switch (action.type) {
    case ASSIGN_ESSAY_REQUEST:
      return state;
    case ASSIGN_ESSAY_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case ASSIGN_ESSAY_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: ''
      })
    default:
      return state;

  }
}

function fetchCurrentUserDetails(state = {user: {}}, action) {
  switch (action.type) {
    case FETCH_CURRENT_USER_DETAILS_REQUEST:
      return state;
    case FETCH_CURRENT_USER_DETAILS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case FETCH_CURRENT_USER_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        user: action.user
      });
    case REMOVE_CURRENT_USER_DETAILS:
      return Object.assign({}, state, {
        user: {}
      })
    default:
      return state;

  }
}

function fetchHomeworkDue(state = {homework: []}, action) {
  switch (action.type) {
    case HOMEWORK_DUE_REQUEST:
      return state;
    case HOMEWORK_DUE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case HOMEWORK_DUE_SUCCESS:
      return Object.assign({}, state, {
        homework: action.homework
      });
    default:
      return state;
  }
}

function fetchEssay(state = {essay: {
  title: '',
  description: '',
  dateDue: ''
}}, action) {
  switch (action.type) {
    case FETCH_ESSAY_REQUEST:
      return state;
    case FETCH_ESSAY_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case FETCH_ESSAY_SUCCESS:
      return Object.assign({}, state, {
        essay: action.essay
      });
    default:
      return state;
  }
}

function submitEssay(state = {}, action) {
  switch (action.type) {
    case SUBMIT_ESSAY_REQUEST:
      return Object.assign({}, state, {
        errorMessage: action.message,
        failed: false,
        hasResponse: false
      });
    case SUBMIT_ESSAY_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        failed: true,
        hasResponse: true
      });
    case SUBMIT_ESSAY_SUCCESS:
      return Object.assign({}, state, {
        failed: false,
        hasResponse: true
      });
    default:
      return state;
  }
}

function fetchSubmissions(state = {submissions: []}, action) {
  switch (action.type) {
    case FETCH_SUBMISSIONS_REQUEST:
      return state;
    case FETCH_SUBMISSIONS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case FETCH_SUBMISSIONS_SUCCESS:
      return Object.assign({}, state, {
        submissions: action.submissions
      });
    default:
      return state;
  }
}

function fetchEssaySubmission(state = {submission: {}, hasResponse: false}, action) {
  switch (action.type) {
    case FETCH_ESSAY_SUBMISSION_REQUEST:
      return Object.assign({}, state, {
        hasResponse: false,
      });
    case FETCH_ESSAY_SUBMISSION_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        hasResponse: true,
        error: true
      });
    case FETCH_ESSAY_SUBMISSION_SUCCESS:
      return Object.assign({}, state, {
        submission: action.submission,
        error: false,
        hasResponse: true
      });
    default:
      return state;
  }
}

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
  signUp,
  auth,
  usersListing,
  permissionsListing,
  userCreate,
  createSubject,
  subjectListing,
  grantPermission,
  lessonListing,
  createLesson,
  lessonsTaughtListing,
  lessonDetail,
  assignEssay,
  fetchCurrentUserDetails,
  fetchHomeworkDue,
  fetchEssay,
  submitEssay,
  fetchSubmissions,
  fetchEssaySubmission
})

export default reducer;
