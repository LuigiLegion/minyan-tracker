// Imports
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import firebaseConfig from '../config/firebaseConfig.json';
import rootReducer from './rootReducer';

// Initializations
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(firebase, firebaseConfig)
);

const store = createStore(rootReducer, middleware);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

// Exports
export default store;
export * from './reducers/authReducer';
export * from './reducers/userReducer';
export * from './reducers/adminReducer';
export * from './reducers/shacharitAttendanceReducer';
export * from './reducers/shacharitCheckInReducer';
export * from './reducers/minchaAttendanceReducer';
export * from './reducers/minchaCheckInReducer';
export * from './reducers/maarivAttendanceReducer';
export * from './reducers/maarivCheckInReducer';
export * from './reducers/shabbatAttendanceReducer';
export * from './reducers/shabbatCheckInReducer';
export * from './reducers/layoutReducer';
export * from './reducers/pathReducer';
