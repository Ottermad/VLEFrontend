import { combineReducers } from 'redux';
import auth from './auth';
import signUp from './signUp';
import { permissionsListing, grantPermission, revokePermission } from './permissions';
import { createSubject, subjectListing, subjectDelete, subjectEdit, subjectDetail } from './subjects';
import { lessonListing, createLesson, lessonDetail, lessonsTaughtListing, lessonDelete, lessonEdit } from './lessons';
import { fetchEssaySubmission, fetchEssay, submitEssay, assignEssay } from './homework/essay';
import { assignQuiz, submitQuiz, fetchQuiz, fetchQuizSubmission } from './homework/quiz';
import { fetchHomeworkDue, fetchSubmissions } from './homework';
import { usersListing, userCreate, fetchCurrentUserDetails, userEdit, fetchUser, userDelete } from './users';
import { createComment } from './homework/comments';

// We combine the reducers here so that they
// can be left split apart in different files
const reducer = combineReducers({
  signUp,
  auth,
  usersListing,
  permissionsListing,
  userCreate,
  userEdit,
  userDelete,
  fetchUser,
  createSubject,
  subjectEdit,
  subjectDelete,
  subjectDetail,
  subjectListing,
  grantPermission,
  revokePermission,
  lessonListing,
  createLesson,
  lessonDelete,
  lessonEdit,
  lessonsTaughtListing,
  lessonDetail,
  assignEssay,
  fetchCurrentUserDetails,
  fetchHomeworkDue,
  fetchEssay,
  submitEssay,
  assignQuiz,
  submitQuiz,
  fetchQuiz,
  fetchSubmissions,
  fetchEssaySubmission,
  fetchQuizSubmission,
  createComment
})

export default reducer;
