// Initial State
const initialState = {
  firstName: '',
  lastName: '',
  fullName: '',
  email: '',
  gender: '',
  congregation: '',
  friday: false,
  saturday: false,
};

// Actions
const GOT_USER_DATA = 'GOT_USER_DATA';
const UPDATED_FRIDAY_CHECK_IN_STATUS = 'UPDATED_FRIDAY_CHECK_IN_STATUS';
const UPDATED_SATURDAY_CHECK_IN_STATUS = 'UPDATED_SATURDAY_CHECK_IN_STATUS';

// Action Creators
const gotUserDataActionCreator = user => ({
  type: GOT_USER_DATA,
  user,
});

const updatedFridayCheckInActionCreator = statusVal => ({
  type: UPDATED_FRIDAY_CHECK_IN_STATUS,
  statusVal,
});

const updatedSaturdayCheckInActionCreator = statusVal => ({
  type: UPDATED_SATURDAY_CHECK_IN_STATUS,
  statusVal,
});

// Thunks
export const getUserDataThunkCreator = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      // console.log('userId in getUserDataThunkCreator: ', userId);

      const userDataRaw = await firestore
        .collection('users')
        .doc(userId)
        .get();

      const userDataObj = userDataRaw.data();

      dispatch(gotUserDataActionCreator(userDataObj));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCheckInStatusThunkCreator = (userId, day, status) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      await firestore
        .collection('users')
        .doc(userId)
        .update({
          [day]: status,
        });

      if (day.toLowerCase() === 'friday') {
        dispatch(updatedFridayCheckInActionCreator(status));
      } else {
        dispatch(updatedSaturdayCheckInActionCreator(status));
      }
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
        ...action.user,
      };

    case UPDATED_FRIDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_FRIDAY_CHECK_IN_STATUS: action.statusVal',
      //   action.statusVal
      // );

      return { ...state, friday: action.statusVal };

    case UPDATED_SATURDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_SATURDAY_CHECK_IN_STATUS action.statusVal: ',
      //   action.statusVal
      // );

      return { ...state, saturday: action.statusVal };

    default:
      return state;
  }
};

export default userReducer;
