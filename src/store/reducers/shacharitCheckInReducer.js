/* eslint-disable complexity */

import { getUserDataThunkCreator } from './userReducer';
import { getUsersShacharitAttendanceThunkCreator } from './shacharitAttendanceReducer';

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

      const userDataRaw = await firestore
        .collection('users')
        .doc(localStorage.uid)
        .get();

      const { shacharit } = userDataRaw.data();

      // console.log(
      //   'shacharit in getShacharitCheckInStatusesThunkCreator: ',
      //   shacharit
      // );

      dispatch(gotShacharitCheckInStatusesActionCreator(shacharit));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateShacharitCheckInStatusThunkCreator = (
  userId,
  day,
  status
) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      // console.log('userId in updateShacharitCheckInStatusThunkCreator: ', userId);
      // console.log('day in updateShacharitCheckInStatusThunkCreator: ', day);
      // console.log('status in updateShacharitCheckInStatusThunkCreator: ', status);

      const firestore = getFirestore();

      await firestore
        .collection('users')
        .doc(userId)
        .set(
          {
            shacharit: {
              [day]: status,
            },
          },
          { merge: true }
        );

      const newUpdateData = {
        user: localStorage.fullName,
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
      // console.log(
      //   'GOT_SHACHARIT_CHECK_IN_STATUSES action: ',
      //   'action.statuses: ',
      //   action.statuses
      // );

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
      // console.log(
      //   'UPDATED_SHACHARIT_CHECK_IN_STATUS action: ',
      //   'action.day: ',
      //   action.day,
      //   'action.status',
      //   action.status
      // );

      return { ...state, [action.day]: action.status };

    default:
      return state;
  }
};

export default shacharitCheckInReducer;
