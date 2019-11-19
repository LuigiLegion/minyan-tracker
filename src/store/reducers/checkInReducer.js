// Initial State
const initialState = {
  checkedFriday: false,
  checkedSaturday: false,
};

// Actions
const FRIDAY_CHECK_IN = 'FRIDAY_CHECK_IN';
const SATURDAY_CHECK_IN = 'SATURDAY_CHECK_IN';

// Action Creators
const fridayCheckInActionCreator = status => ({
  type: FRIDAY_CHECK_IN,
  status,
});

const saturdayCheckInActionCreator = status => ({
  type: SATURDAY_CHECK_IN,
  status,
});

// Thunks
export const checkInThunkCreator = (userId, day, status) => {
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
        dispatch(fridayCheckInActionCreator(status));
      } else {
        dispatch(saturdayCheckInActionCreator(status));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const checkInReducer = (state = initialState, action) => {
  switch (action.type) {
    case FRIDAY_CHECK_IN:
      console.log('FRIDAY_CHECK_IN: ', action.status);

      return { ...state, checkedFriday: action.status };

    case SATURDAY_CHECK_IN:
      console.log('SATURDAY_CHECK_IN: ', action.status);

      return { ...state, checkedSaturday: action.status };

    default:
      return state;
  }
};

export default checkInReducer;
