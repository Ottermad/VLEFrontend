import {
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  SUBJECT_EDIT_REQUEST, SUBJECT_EDIT_FAILURE, SUBJECT_EDIT_SUCCESS,
  SUBJECT_DELETE_REQUEST, SUBJECT_DELETE_SUCCESS, SUBJECT_DELETE_FAILURE,
  SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE, SUBJECT_LISTING_SUCCESS,
  SUBJECT_DETAIL_REQUEST, SUBJECT_DETAIL_SUCCESS, SUBJECT_DETAIL_FAILURE
} from '../constants';

export function createSubject(state = {successMessage: '', errorMessage: ''}, action) {
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

export function subjectListing(state = {subjects: []}, action) {
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

export function subjectEdit(state = {}, action) {
  switch(action.type) {
    case SUBJECT_EDIT_REQUEST:
      return state;
    case SUBJECT_EDIT_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case SUBJECT_EDIT_SUCCESS:
      return Object.assign({}, state, {
        successMessage: "Subject updated"
      })
    default:
      return state;
  }
}

export function subjectDelete(state = {successMessage: null, errorMessage: null}, action) {
  switch (action.type) {
    case SUBJECT_DELETE_REQUEST:
      return state;
    case SUBJECT_DELETE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: null
      });
    case SUBJECT_DELETE_SUCCESS:
      return Object.assign({}, state, {
        successMessage: "Subject deleted.",
        errorMessage: null
      });
    default:
      return state;

  }
}

export function subjectDetail(state = {subject: {}}, action) {
  switch(action.type) {
    case SUBJECT_DETAIL_REQUEST:
      return state;
    case SUBJECT_DETAIL_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case SUBJECT_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        subject: action.subject
      });
    default:
      return state;
  }
}
