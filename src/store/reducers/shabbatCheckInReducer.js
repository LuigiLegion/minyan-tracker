import { getUserDataThunkCreator } from './userReducer';
import { getUsersShabbatAttendanceThunkCreator } from './shabbatAttendanceReducer';

// Initial State
const initialState = {
  friday: false,
  saturday: false,
};

// Action Types
const GOT_SHABBAT_CHECK_IN_STATUSES = 'GOT_SHABBAT_CHECK_IN_STATUSES';
const UPDATED_SHABBAT_CHECK_IN_STATUS = 'UPDATED_SHABBAT_CHECK_IN_STATUS';

// Action Creators
export const gotShabbatCheckInStatusesActionCreator = statuses => ({
  type: GOT_SHABBAT_CHECK_IN_STATUSES,
  statuses,
});

export const updatedShabbatCheckInStatusActionCreator = (day, status) => ({
  type: UPDATED_SHABBAT_CHECK_IN_STATUS,
  day,
  status,
});

// Thunk Creators
export const getShabbatCheckInStatusesThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { uid } = JSON.parse(localStorage.getItem('minyanTracker'));

      const userDataRaw = await firestore
        .collection('users')
        .doc(uid)
        .get();

      const { shabbat } = userDataRaw.data();

      dispatch(gotShabbatCheckInStatusesActionCreator(shabbat));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateShabbatCheckInStatusThunkCreator = (day, status) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { uid, fullName, congregation } = JSON.parse(
        localStorage.getItem('minyanTracker')
      );

      await firestore
        .collection('users')
        .doc(uid)
        .set(
          {
            shabbat: {
              [day]: status,
            },
          },
          { merge: true }
        );

      const newUpdateData = {
        uid,
        fullName,
        congregation,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      await firestore
        .collection('updates')
        .doc()
        .set(newUpdateData);

      dispatch(updatedShabbatCheckInStatusActionCreator(day, status));

      dispatch(getUserDataThunkCreator());
      dispatch(getUsersShabbatAttendanceThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const shabbatCheckInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SHABBAT_CHECK_IN_STATUSES:
      return {
        ...state,
        friday: action.statuses.friday,
        saturday: action.statuses.saturday,
      };

    case UPDATED_SHABBAT_CHECK_IN_STATUS:
      return { ...state, [action.day]: action.status };

    default:
      return state;
  }
};

export default shabbatCheckInReducer;
