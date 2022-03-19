// Imports
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';
import shacharitAttendanceReducer from './reducers/shacharitAttendanceReducer';
import shacharitCheckInReducer from './reducers/shacharitCheckInReducer';
import minchaAttendanceReducer from './reducers/minchaAttendanceReducer';
import minchaCheckInReducer from './reducers/minchaCheckInReducer';
import maarivAttendanceReducer from './reducers/maarivAttendanceReducer';
import maarivCheckInReducer from './reducers/maarivCheckInReducer';
import shabbatAttendanceReducer from './reducers/shabbatAttendanceReducer';
import shabbatCheckInReducer from './reducers/shabbatCheckInReducer';
import layoutReducer from './reducers/layoutReducer';
import pathReducer from './reducers/pathReducer';

// Initializations
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  shacharitAttendance: shacharitAttendanceReducer,
  shacharitCheckIn: shacharitCheckInReducer,
  minchaAttendance: minchaAttendanceReducer,
  minchaCheckIn: minchaCheckInReducer,
  maarivAttendance: maarivAttendanceReducer,
  maarivCheckIn: maarivCheckInReducer,
  shabbatAttendance: shabbatAttendanceReducer,
  shabbatCheckIn: shabbatCheckInReducer,
  layout: layoutReducer,
  path: pathReducer,
});

// Exports
export default rootReducer;
