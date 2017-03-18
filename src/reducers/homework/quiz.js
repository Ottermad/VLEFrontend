import {
  ASSIGN_QUIZ_REQUEST, ASSIGN_QUIZ_FAILURE, ASSIGN_QUIZ_SUCCESS,
  SUBMIT_QUIZ_REQUEST, SUBMIT_QUIZ_SUCCESS, SUBMIT_QUIZ_FAILURE,
  FETCH_QUIZ_REQUEST, FETCH_QUIZ_SUCCESS, FETCH_QUIZ_FAILURE,
  FETCH_QUIZ_SUBMISSION_REQUEST, FETCH_QUIZ_SUBMISSION_FAILURE, FETCH_QUIZ_SUBMISSION_SUCCESS,
} from '../../constants';

export function assignQuiz(state = {}, action) {
  switch (action.type) {
    case ASSIGN_QUIZ_REQUEST:
      return state;
    case ASSIGN_QUIZ_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case ASSIGN_QUIZ_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: ''
      })
    default:
      return state;

  }
}

export function submitQuiz(state = {}, action) {
  switch (action.type) {
    case SUBMIT_QUIZ_REQUEST:
      return Object.assign({}, state, {
        errorMessage: action.message,
        failed: false,
        hasResponse: false
      });
    case SUBMIT_QUIZ_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        failed: true,
        hasResponse: true
      });
    case SUBMIT_QUIZ_SUCCESS:
      return Object.assign({}, state, {
        failed: false,
        hasResponse: true
      });
    default:
      return state;
  }
}

export function fetchQuiz(state = {quiz: {
  title: '',
  description: '',
  dateDue: ''
}}, action) {
  switch (action.type) {
    case FETCH_QUIZ_REQUEST:
      return state;
    case FETCH_QUIZ_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case FETCH_QUIZ_SUCCESS:
      return Object.assign({}, state, {
        quiz: action.quiz
      });
    default:
      return state;
  }
}

export function fetchQuizSubmission(state = {submission: {}, hasResponse: false}, action) {
  switch (action.type) {
    case FETCH_QUIZ_SUBMISSION_REQUEST:
      return Object.assign({}, state, {
        hasResponse: false,
      });
    case FETCH_QUIZ_SUBMISSION_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        hasResponse: true,
        error: true
      });
    case FETCH_QUIZ_SUBMISSION_SUCCESS:
      return Object.assign({}, state, {
        submission: action.submission,
        error: false,
        hasResponse: true
      });
    default:
      return state;
  }
}