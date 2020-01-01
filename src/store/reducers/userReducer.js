/* eslint-disable complexity */

// import { getUsersShacharitAttendanceThunkCreator } from './shacharitAttendanceReducer';
// import { getUsersMinchaAttendanceThunkCreator } from './minchaAttendanceReducer';
// import { getUsersMaarivAttendanceThunkCreator } from './maarivAttendanceReducer';
// import { getUsersShabbatAttendanceThunkCreator } from './shabbatAttendanceReducer';

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
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firebase = getFirebase();

      const { currentUser } = firebase.auth();

      // console.log('currentUser.uid in getUserDataThunkCreator: ', currentUser.uid);

      const firestore = getFirestore();

      const userDataRaw = await firestore
        .collection('users')
        .doc(currentUser.uid)
        .get();

      const userDataObj = userDataRaw.data();

      // console.log('userDataObj in getUserDataThunkCreator: ', userDataObj);

      const userData = {
        uid: currentUser.uid,
        fullName: userDataObj.fullName,
        congregation: userDataObj.congregation,
      };

      // console.log('userData in getUserDataThunkCreator: ', userData);

      dispatch(gotUserDataActionCreator(userData));

      // dispatch(getUsersShacharitAttendanceThunkCreator());
      // dispatch(getUsersMinchaAttendanceThunkCreator());
      // dispatch(getUsersMaarivAttendanceThunkCreator());
      // dispatch(getUsersShabbatAttendanceThunkCreator());

      const { uid, fullName, congregation } = userData;

      localStorage.setItem('uid', uid);
      localStorage.setItem('fullName', fullName);
      localStorage.setItem('congregation', congregation);

      // console.log('localStorage in getUserDataThunkCreator: ', localStorage);
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_DATA:
      // console.log('GOT_USER_DATA action.user: ', action.user);

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

export default userReducer;
