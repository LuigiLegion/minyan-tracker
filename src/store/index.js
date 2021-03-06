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

import fbConfig from '../config/fbConfig';
import rootReducer from './rootReducer';

// Initializations
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

firebase.initializeApp(fbConfig);
export const db = firebase.firestore();

const middleware = composeWithDevTools(
  applyMiddleware(
    thunkMiddleware.withExtraArgument({ getFirebase, getFirestore }),
    createLogger({ collapsed: true })
  ),
  reduxFirestore(firebase, fbConfig)
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
