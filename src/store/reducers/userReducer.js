// Initial State
const initialState = {
  uid: '',
  fullName: '',
  congregation: '',
};

// Action Types
const GOT_USER_DATA = 'GOT_USER_DATA';

// Action Creators
export const gotUserDataActionCreator = user => ({
  type: GOT_USER_DATA,
  user,
});

// Thunk Creators
export const getUserDataThunkCreator = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebase = getFirebase();
      const firestore = getFirestore();

      const {
        currentUser: { uid },
      } = firebase.auth();

      const userDataRaw = await firestore
        .collection('users')
        .doc(uid)
        .get();

      const { fullName, congregation } = userDataRaw.data();

      const userData = {
        uid,
        fullName,
        congregation,
      };

      dispatch(gotUserDataActionCreator(userData));

      localStorage.setItem('minyanTracker', JSON.stringify(userData));
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_DATA:
      return {
        ...state,
        uid: action.user.uid,
        fullName: action.user.fullName,
        congregation: action.user.congregation,
      };

    default:
      return state;
  }
};

// Exports
export default userReducer;
