import {
  LESSON_LISTING_REQUEST, LESSON_LISTING_FAILURE, LESSON_LISTING_SUCCESS,
  LESSON_TAUGHT_LISTING_REQUEST, LESSON_TAUGHT_LISTING_FAILURE, LESSON_TAUGHT_LISTING_SUCCESS,
  LESSON_CREATE_REQUEST, LESSON_CREATE_SUCCESS, LESSON_CREATE_FAILURE,
  LESSON_DETAIL_REQUEST, LESSON_DETAIL_SUCCESS, LESSON_DETAIL_FAILURE,
} from '../constants';

export function lessonListing(state = {lessons: []}, action) {
  switch(action.type) {
    case LESSON_LISTING_REQUEST:
      return state;
    case LESSON_LISTING_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_LISTING_SUCCESS:
      return Object.assign({}, state, {
        lessons: action.lessons
      })
    default:
      return state;
  }
}

export function createLesson(state = {successMessage: '', errorMessage: '', lessons: []}, action) {
  switch (action.type) {
    case LESSON_CREATE_REQUEST:
      return state;
    case LESSON_CREATE_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
        successMessage: ''
      });
    case LESSON_CREATE_SUCCESS:
      return Object.assign({}, state, {
        successMessage: action.message,
        errorMessage: '',
        lessons: action.lessons
      })
    default:
      return state;

  }
}

export function lessonsTaughtListing(state = {lessons: []}, action) {
  switch(action.type) {
    case LESSON_TAUGHT_LISTING_REQUEST:
      return state;
    case LESSON_TAUGHT_LISTING_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_TAUGHT_LISTING_SUCCESS:
      return Object.assign({}, state, {
        lessons: action.lessons
      })
    default:
      return state;
  }
}

export function lessonDetail(state = {lesson: {name: '', homework: [], teachers: [], students: [], subject: {name: ''}}}, action) {
  switch(action.type) {
    case LESSON_DETAIL_REQUEST:
      return state;
    case LESSON_DETAIL_FAILURE:
      return Object.assign({}, state, {
        errorMessage: action.message,
      });
    case LESSON_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        lesson: action.lesson,
      });
    default:
      return state;
  }
}
