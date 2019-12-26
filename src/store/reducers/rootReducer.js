import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import userReducer from './userReducer';
import shacharitAttendanceReducer from './shacharitAttendanceReducer';
import minchaAttendanceReducer from './minchaAttendanceReducer';
import maarivAttendanceReducer from './maarivAttendanceReducer';
import shabbatAttendanceReducer from './shabbatAttendanceReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  user: userReducer,
  shacharitAttendance: shacharitAttendanceReducer,
  minchaAttendance: minchaAttendanceReducer,
  maarivAttendance: maarivAttendanceReducer,
  shabbatAttendance: shabbatAttendanceReducer,
  admin: adminReducer,
});

export default rootReducer;
