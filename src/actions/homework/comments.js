import {
  COMMENT_CREATE_FAILURE, COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS
} from '../../constants';
import { BASE_URL } from '../index';

// Comment creation
function createCommentRequest() {
  return {
    type: COMMENT_CREATE_REQUEST
  }
}

function createCommentSuccess() {
  return {
    type: COMMENT_CREATE_SUCCESS,
    message: 'Created!'
  }
}

function createCommentFailure(message) {
  return {
    type: COMMENT_CREATE_FAILURE,
    message
  }
}

export function createComment(comment) {
  const id_token = localStorage.getItem('id_token')

  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${id_token}`
    },
    body: JSON.stringify(comment)
  }

  return dispatch => {
    dispatch(createCommentRequest())
    fetch(`${BASE_URL}homework/comment`, config)
    .then(response => response.json())
    .then(json => {
      if ("error" in json) {
        dispatch(createCommentFailure(json.message))
      } else {
        dispatch(createCommentSuccess())
      }
    }).catch(err => console.log("Error: ", err))
  }
}
