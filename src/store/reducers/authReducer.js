// Initial State
const initialState = {
  signUpAuthError: null,
  signInAuthError: null,
};

// Action Types
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR';

// Action Creators
export const signUpSuccessActionCreator = newUser => ({
  type: SIGN_UP_SUCCESS,
  newUser,
});

export const signUpErrorActionCreator = error => ({
  type: SIGN_UP_ERROR,
  error,
});

export const signInSuccessActionCreator = userCredentials => ({
  type: SIGN_IN_SUCCESS,
  userCredentials,
});

export const signInErrorActionCreator = error => ({
  type: SIGN_IN_ERROR,
  error,
});

export const signOutSuccessActionCreator = () => ({
  type: SIGN_OUT_SUCCESS,
});

export const signOutErrorActionCreator = () => ({
  type: SIGN_OUT_ERROR,
});

// Thunk Creators
export const signUpThunkCreator = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      // console.log('newUser in signUpThunkCreator: ', newUser);

      const firebase = getFirebase();

      const firestore = getFirestore();

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password);

      const newUserData = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
        gender: newUser.gender,
        congregation: newUser.congregation,
        shacharit: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
        },
        mincha: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
        },
        maariv: {
          sunday: false,
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          saturday: false,
        },
        shabbat: {
          friday: false,
          saturday: false,
        },
      };

      // console.log('newUserObj in signUpThunkCreator: ', newUserObj);

      await firestore
        .collection('users')
        .doc(user.uid)
        .set(newUserData);

      dispatch(signUpSuccessActionCreator(newUser));
    } catch (error) {
      console.error(error);
      dispatch(signUpErrorActionCreator(error));
    }
  };
};

export const signInThunkCreator = userCredentials => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      // console.log('userCredentials in signInThunkCreator: ', userCredentials);

      const firebase = getFirebase();

      await firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );

      dispatch(signInSuccessActionCreator(userCredentials));
    } catch (error) {
      console.error(error);
      dispatch(signInErrorActionCreator(error));
    }
  };
};

export const signOutThunkCreator = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();

      await firebase.auth().signOut();

      dispatch(signOutSuccessActionCreator());

      localStorage.clear();

      // console.log('localStorage in signOutThunkCreator: ', localStorage);
    } catch (error) {
      console.error(error);
      dispatch(signOutErrorActionCreator());
    }
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_SUCCESS:
      console.log('Signed up successfully');

      return { ...state, signUpAuthError: null };

    case SIGN_UP_ERROR:
      console.log('Sign up error!', action.error.message);

      return { ...state, signUpAuthError: action.error.message };

    case SIGN_IN_SUCCESS:
      console.log('Signed in successfully');

      return { ...state, signInAuthError: null };

    case SIGN_IN_ERROR:
      console.log('Sign in error!', action.error.message);

      return { ...state, signInAuthError: action.error.message };

    case SIGN_OUT_SUCCESS:
      console.log('Signed out successfully');

      return state;

    case SIGN_OUT_ERROR:
      console.log('Sign out error!');

      return state;

    default:
      return state;
  }
};

export default authReducer;
