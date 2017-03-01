import {
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE,
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

export default signUp;
