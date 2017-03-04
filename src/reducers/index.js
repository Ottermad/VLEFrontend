import { combineReducers } from 'redux';
import auth from './auth';
import signUp from './signUp';
import { permissionsListing, grantPermission, revokePermission } from './permissions';
import { createSubject, subjectListing } from './subjects';
import { lessonListing, createLesson, lessonDetail, lessonsTaughtListing } from './lessons';
import { fetchEssaySubmission, fetchEssay, submitEssay, assignEssay } from './homework/essay';
import { fetchHomeworkDue, fetchSubmissions } from './homework';
import { usersListing, userCreate, fetchCurrentUserDetails, userEdit, fetchUser } from './users';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
  signUp,
  auth,
  usersListing,
  permissionsListing,
  userCreate,
  userEdit,
  fetchUser,
  createSubject,
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
