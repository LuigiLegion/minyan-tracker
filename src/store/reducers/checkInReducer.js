// Initial State
const initialState = {
  checkedFriday: false,
  checkedSaturday: false,
};

// Actions
const GOT_CHECK_IN_STATUSES = 'GOT_CHECK_IN_STATUSES';
const UPDATED_FRIDAY_CHECK_IN_STATUS = 'UPDATED_FRIDAY_CHECK_IN_STATUS';
const UPDATED_SATURDAY_CHECK_IN_STATUS = 'UPDATED_SATURDAY_CHECK_IN_STATUS';

// Action Creators
const gotCheckInStatusActionCreator = statusObj => ({
  type: GOT_CHECK_IN_STATUSES,
  statusObj,
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
export const getCheckInStatusThunkCreator = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      // console.log('userId in getCheckInStatusThunkCreator: ', userId);

      const userData = await firestore
        .collection('users')
        .doc(userId)
        .get();

      const { friday, saturday } = userData.data();

      const userCheckInStatusesData = {
        friday,
        saturday,
      };

      dispatch(gotCheckInStatusActionCreator(userCheckInStatusesData));
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
const checkInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CHECK_IN_STATUSES:
      // console.log('GOT_CHECK_IN_STATUSES action.statusObj: ', action.statusObj);

      return {
        ...state,
        checkedFriday: action.statusObj.friday,
        checkedSaturday: action.statusObj.saturday,
      };

    case UPDATED_FRIDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_FRIDAY_CHECK_IN_STATUS: action.statusVal',
      //   action.statusVal
      // );

      return { ...state, checkedFriday: action.statusVal };

    case UPDATED_SATURDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_SATURDAY_CHECK_IN_STATUS action.statusVal: ',
      //   action.statusVal
      // );

      return { ...state, checkedSaturday: action.statusVal };

    default:
      return state;
  }
};

export default checkInReducer;
