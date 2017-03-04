import {
  FETCH_PERMISSIONS_REQUEST, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE,
  GRANT_PERMISSION_REQUEST, GRANT_PERMISSION_FAILURE, GRANT_PERMISSION_SUCCESS,
  REVOKE_PERMISSION_REQUEST, REVOKE_PERMISSION_SUCCESS, REVOKE_PERMISSION_FAILURE
} from '../constants';


export function permissionsListing(state = {permissions: []}, action) {
  console.log(FETCH_PERMISSIONS_SUCCESS)
  console.log("permissionsListing", action)
  switch (action.type) {
    case FETCH_PERMISSIONS_REQUEST:
      return state;
    case FETCH_PERMISSIONS_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    case FETCH_PERMISSIONS_SUCCESS:
      console.log("succes")
      return Object.assign({}, state, {
        permissions: action.permissions
      })
    default:
      console.log('default')
      return state;

  }
}

export function grantPermission(state = {}, action) {
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

export function revokePermission(state = {}, action) {
  switch (action.type) {
    case REVOKE_PERMISSION_REQUEST:
      return state;
    case REVOKE_PERMISSION_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message
      });
    case REVOKE_PERMISSION_SUCCESS:
      return state;
    default:
      return state;

  }
}
