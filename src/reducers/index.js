import { combineReducers } from 'redux';
import auth from './auth';
import signUp from './signUp';
import { permissionsListing, grantPermission, revokePermission } from './permissions';
import { createSubject, subjectListing, subjectDelete, subjectEdit, subjectDetail } from './subjects';
import { lessonListing, createLesson, lessonDetail, lessonsTaughtListing } from './lessons';
import { fetchEssaySubmission, fetchEssay, submitEssay, assignEssay } from './homework/essay';
import { fetchHomeworkDue, fetchSubmissions } from './homework';
import { usersListing, userCreate, fetchCurrentUserDetails, userEdit, fetchUser, userDelete } from './users';

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
  lessonsTaughtListing,
  lessonDetail,
  assignEssay,
  fetchCurrentUserDetails,
  fetchHomeworkDue,
  fetchEssay,
  submitEssay,
  fetchSubmissions,
  fetchEssaySubmission
})

export default reducer;
