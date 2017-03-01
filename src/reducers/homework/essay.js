import {
  FETCH_ESSAY_REQUEST, FETCH_ESSAY_SUCCESS, FETCH_ESSAY_FAILURE,
  SUBMIT_ESSAY_REQUEST, SUBMIT_ESSAY_SUCCESS, SUBMIT_ESSAY_FAILURE,
  FETCH_ESSAY_SUBMISSION_REQUEST, FETCH_ESSAY_SUBMISSION_FAILURE, FETCH_ESSAY_SUBMISSION_SUCCESS,
  ASSIGN_ESSAY_REQUEST, ASSIGN_ESSAY_FAILURE, ASSIGN_ESSAY_SUCCESS,
} from '../../constants';

export function fetchEssay(state = {essay: {
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

export function submitEssay(state = {}, action) {
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

export function fetchEssaySubmission(state = {submission: {}, hasResponse: false}, action) {
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

export function assignEssay(state = {}, action) {
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
