/* eslint-disable complexity */

import { getUserDataThunkCreator } from './userReducer';
import { getUsersMinchaAttendanceThunkCreator } from './minchaAttendanceReducer';

// Initial State
const initialState = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
};

// Action Types
const GOT_MINCHA_CHECK_IN_STATUSES = 'GOT_MINCHA_CHECK_IN_STATUSES';
const UPDATED_MINCHA_CHECK_IN_STATUS = 'UPDATED_MINCHA_CHECK_IN_STATUS';

// Action Creators
export const gotMinchaCheckInStatusesActionCreator = statuses => ({
  type: GOT_MINCHA_CHECK_IN_STATUSES,
  statuses,
});

export const updatedMinchaCheckInStatusActionCreator = (day, status) => ({
  type: UPDATED_MINCHA_CHECK_IN_STATUS,
  day,
  status,
});

// Thunk Creators
export const getMinchaCheckInStatusesThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const userDataRaw = await firestore
        .collection('users')
        .doc(localStorage.uid)
        .get();

      const { mincha } = userDataRaw.data();

      // console.log(
      //   'mincha in getMinchaCheckInStatusesThunkCreator: ',
      //   mincha
      // );

      dispatch(gotMinchaCheckInStatusesActionCreator(mincha));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMinchaCheckInStatusThunkCreator = (userId, day, status) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      // console.log('userId in updateMinchaCheckInStatusThunkCreator: ', userId);
      // console.log('day in updateMinchaCheckInStatusThunkCreator: ', day);
      // console.log('status in updateMinchaCheckInStatusThunkCreator: ', status);

      const firestore = getFirestore();

      await firestore
        .collection('users')
        .doc(userId)
        .set(
          {
            mincha: {
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

      dispatch(updatedMinchaCheckInStatusActionCreator(day, status));

      dispatch(getUserDataThunkCreator());
      dispatch(getUsersMinchaAttendanceThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const minchaCheckInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MINCHA_CHECK_IN_STATUSES:
      // console.log(
      //   'GOT_MINCHA_CHECK_IN_STATUSES action: ',
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
        saturday: action.statuses.saturday,
      };

    case UPDATED_MINCHA_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_MINCHA_CHECK_IN_STATUS action: ',
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

export default minchaCheckInReducer;
