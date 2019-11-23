import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

import authReducer from './authReducer';
import userReducer from './userReducer';
import attendanceReducer from './attendanceReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  user: userReducer,
  attendance: attendanceReducer,
});

export default rootReducer;
