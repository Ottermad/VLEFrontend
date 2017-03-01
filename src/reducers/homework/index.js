import {
  HOMEWORK_DUE_REQUEST, HOMEWORK_DUE_SUCCESS, HOMEWORK_DUE_FAILURE,
  FETCH_SUBMISSIONS_REQUEST, FETCH_SUBMISSIONS_FAILURE, FETCH_SUBMISSIONS_SUCCESS
} from '../../constants';

export function fetchHomeworkDue(state = {homework: []}, action) {
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

export function fetchSubmissions(state = {submissions: []}, action) {
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
