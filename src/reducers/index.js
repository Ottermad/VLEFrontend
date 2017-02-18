import { combineReducers } from 'redux'
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE,
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  USER_CREATE_REQUEST, USER_CREATE_SUCCESS, USER_CREATE_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS
} from '../constants'

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
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



// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
  auth,
  usersListing,
  permissionsListing,
  userCreate,
  grantPermission
})

export default reducer;
