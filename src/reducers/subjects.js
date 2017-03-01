import {
  SUBJECT_CREATE_REQUEST, SUBJECT_CREATE_FAILURE, SUBJECT_CREATE_SUCCESS,
  SUBJECT_LISTING_REQUEST, SUBJECT_LISTING_FAILURE, SUBJECT_LISTING_SUCCESS
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
