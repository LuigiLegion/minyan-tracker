import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import adminReducer from './reducers/adminReducer';
import shacharitAttendanceReducer from './reducers/shacharitAttendanceReducer';
import minchaAttendanceReducer from './reducers/minchaAttendanceReducer';
import maarivAttendanceReducer from './reducers/maarivAttendanceReducer';
import shabbatAttendanceReducer from './reducers/shabbatAttendanceReducer';
import shacharitCheckInReducer from './reducers/shacharitCheckInReducer';
import minchaCheckInReducer from './reducers/minchaCheckInReducer';
import maarivCheckInReducer from './reducers/maarivCheckInReducer';
import shabbatCheckInReducer from './reducers/shabbatCheckInReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  user: userReducer,
  admin: adminReducer,
  shacharitAttendance: shacharitAttendanceReducer,
  minchaAttendance: minchaAttendanceReducer,
  maarivAttendance: maarivAttendanceReducer,
  shabbatAttendance: shabbatAttendanceReducer,
  shacharitCheckIn: shacharitCheckInReducer,
  minchaCheckIn: minchaCheckInReducer,
  maarivCheckIn: maarivCheckInReducer,
  shabbatCheckIn: shabbatCheckInReducer,
});

export default rootReducer;
