import {
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAILURE,
  FETCH_CURRENT_USER_DETAILS_REQUEST, FETCH_CURRENT_USER_DETAILS_FAILURE, FETCH_CURRENT_USER_DETAILS_SUCCESS, REMOVE_CURRENT_USER_DETAILS,
} from '../constants'


export function usersListing(state = {users: []}, action) {
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


export function userCreate(state = {createdUser: {}}, action) {
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

export function fetchCurrentUserDetails(state = {user: {}}, action) {
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
