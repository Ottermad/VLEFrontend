import { combineReducers } from 'redux';
import auth from './auth';
import signUp from './signUp';
import { permissionsListing, grantPermission } from './permissions';
import { createSubject, subjectListing } from './subjects';
import { lessonListing, createLesson, lessonDetail, lessonsTaughtListing } from './lessons';
import { fetchEssaySubmission, fetchEssay, submitEssay, assignEssay } from './homework/essay';
import { fetchHomeworkDue, fetchSubmissions } from './homework';
import { usersListing, userCreate, fetchCurrentUserDetails } from './users';

// We combine the reducers here so that they
// can be left split apart above
const reducer = combineReducers({
  signUp,
  auth,
  usersListing,
  permissionsListing,
  userCreate,
  createSubject,
  subjectListing,
  grantPermission,
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
