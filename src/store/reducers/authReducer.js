// Initial State
const initialState = {
  signUpError: null,
  signInError: null,
  signOutError: null,
};

// Actions Types
const SIGNED_UP_SUCCESS = 'SIGNED_UP_SUCCESS';
const SIGNED_UP_ERROR = 'SIGNED_UP_ERROR';
const SIGNED_IN_SUCCESS = 'SIGNED_IN_SUCCESS';
const SIGNED_IN_ERROR = 'SIGNED_IN_ERROR';
const SIGNED_OUT_SUCCESS = 'SIGNED_OUT_SUCCESS';
const SIGNED_OUT_ERROR = 'SIGNED_OUT_ERROR';

// Action Creators
const signedUpSuccessActionCreator = () => ({
  type: SIGNED_UP_SUCCESS,
});

const signedUpErrorActionCreator = error => ({
  type: SIGNED_UP_ERROR,
  error,
});

const signedInSuccessActionCreator = () => ({
  type: SIGNED_IN_SUCCESS,
});

const signedInErrorActionCreator = error => ({
  type: SIGNED_IN_ERROR,
  error,
});

const signedOutSuccessActionCreator = () => ({
  type: SIGNED_OUT_SUCCESS,
});

const signedOutErrorActionCreator = error => ({
  type: SIGNED_OUT_ERROR,
  error,
});

// Thunk Creators
export const signUpThunkCreator = newUser => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
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

      await firestore
        .collection('users')
        .doc(user.uid)
        .set(newUserData);

      dispatch(signedUpSuccessActionCreator());
    } catch (error) {
      console.error(error);
      dispatch(signedUpErrorActionCreator(error));
    }
  };
};

export const signInThunkCreator = userCredentials => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();

      await firebase
        .auth()
        .signInWithEmailAndPassword(
          userCredentials.email,
          userCredentials.password
        );

      dispatch(signedInSuccessActionCreator());
    } catch (error) {
      console.error(error);
      dispatch(signedInErrorActionCreator(error));
    }
  };
};

export const signOutThunkCreator = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();

      await firebase.auth().signOut();

      dispatch(signedOutSuccessActionCreator());

      localStorage.clear();
    } catch (error) {
      console.error(error);
      dispatch(signedOutErrorActionCreator(error));
    }
  };
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNED_UP_SUCCESS:
      return {
        ...state,
        signUpError: null,
      };

    case SIGNED_UP_ERROR:
      return {
        ...state,
        signUpError: action.error.message,
      };

    case SIGNED_IN_SUCCESS:
      return {
        ...state,
        signInError: null,
      };

    case SIGNED_IN_ERROR:
      return {
        ...state,
        signInError: action.error.message,
      };

    case SIGNED_OUT_SUCCESS:
      return {
        ...state,
        signOutError: null,
      };

    case SIGNED_OUT_ERROR:
      return {
        ...state,
        signOutError: action.error.message,
      };

    default:
      return state;
  }
};

// Exports
export default authReducer;
