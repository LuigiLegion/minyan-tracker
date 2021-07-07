// Imports
import {
  getUserDataThunkCreator,
  getUsersShacharitAttendanceThunkCreator,
} from '..';

// Initial State
const initialState = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
};

// Action Types
const GOT_SHACHARIT_CHECK_IN_STATUSES = 'GOT_SHACHARIT_CHECK_IN_STATUSES';
const UPDATED_SHACHARIT_CHECK_IN_STATUS = 'UPDATED_SHACHARIT_CHECK_IN_STATUS';

// Action Creators
export const gotShacharitCheckInStatusesActionCreator = statuses => ({
  type: GOT_SHACHARIT_CHECK_IN_STATUSES,
  statuses,
});

export const updatedShacharitCheckInStatusActionCreator = (day, status) => ({
  type: UPDATED_SHACHARIT_CHECK_IN_STATUS,
  day,
  status,
});

// Thunk Creators
export const getShacharitCheckInStatusesThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { uid } = JSON.parse(localStorage.getItem('minyanTracker'));

      const userDataRaw = await firestore
        .collection('users')
        .doc(uid)
        .get();

      const { shacharit } = userDataRaw.data();

      dispatch(gotShacharitCheckInStatusesActionCreator(shacharit));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateShacharitCheckInStatusThunkCreator = (day, status) => {
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
            shacharit: {
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

      dispatch(updatedShacharitCheckInStatusActionCreator(day, status));

      dispatch(getUserDataThunkCreator());
      dispatch(getUsersShacharitAttendanceThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const shacharitCheckInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_SHACHARIT_CHECK_IN_STATUSES:
      return {
        ...state,
        sunday: action.statuses.sunday,
        monday: action.statuses.monday,
        tuesday: action.statuses.tuesday,
        wednesday: action.statuses.wednesday,
        thursday: action.statuses.thursday,
        friday: action.statuses.friday,
      };

    case UPDATED_SHACHARIT_CHECK_IN_STATUS:
      return {
        ...state,
        [action.day]: action.status,
      };

    default:
      return state;
  }
};

// Exports
export default shacharitCheckInReducer;
