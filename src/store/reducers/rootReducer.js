import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import userReducer from './userReducer';
import attendanceReducer from './attendanceReducer';
import adminReducer from './adminReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  user: userReducer,
  attendance: attendanceReducer,
  admin: adminReducer,
});

export default rootReducer;
