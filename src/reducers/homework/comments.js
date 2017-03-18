import {
  COMMENT_CREATE_FAILURE, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS
} from '../../constants';

export function createComment(state = {successMessage: '', errorMessage: ''}, action) {
  switch (action.type) {
    case COMMENT_CREATE_REQUEST:
      return state;
    case COMMENT_CREATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case COMMENT_CREATE_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: '',
        comment: action.comment
      })
    default:
      return state;

  }
}
