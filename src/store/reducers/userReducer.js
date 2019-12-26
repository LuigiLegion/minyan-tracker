/* eslint-disable complexity */

import { getUsersAttendanceThunkCreator } from './shabbatAttendanceReducer';

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
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  fridayMincha: false,
  isAdmin: false,
};

// Action Types
const GOT_USER_DATA = 'GOT_USER_DATA';
const UPDATED_FRIDAY_CHECK_IN_STATUS = 'UPDATED_FRIDAY_CHECK_IN_STATUS';
const UPDATED_SATURDAY_CHECK_IN_STATUS = 'UPDATED_SATURDAY_CHECK_IN_STATUS';
const UPDATED_SUNDAY_CHECK_IN_STATUS = 'UPDATED_SUNDAY_CHECK_IN_STATUS';
const UPDATED_MONDAY_CHECK_IN_STATUS = 'UPDATED_MONDAY_CHECK_IN_STATUS';
const UPDATED_TUESDAY_CHECK_IN_STATUS = 'UPDATED_TUESDAY_CHECK_IN_STATUS';
const UPDATED_WEDNESDAY_CHECK_IN_STATUS = 'UPDATED_WEDNESDAY_CHECK_IN_STATUS';
const UPDATED_THURSDAY_CHECK_IN_STATUS = 'UPDATED_THURSDAY_CHECK_IN_STATUS';
const UPDATED_FRIDAY_MINCHA_CHECK_IN_STATUS =
  'UPDATED_FRIDAY_MINCHA_CHECK_IN_STATUS';

// Action Creators
export const gotUserDataActionCreator = user => ({
  type: GOT_USER_DATA,
  user,
});

export const updatedFridayCheckInActionCreator = status => ({
  type: UPDATED_FRIDAY_CHECK_IN_STATUS,
  status,
});

export const updatedSaturdayCheckInActionCreator = status => ({
  type: UPDATED_SATURDAY_CHECK_IN_STATUS,
  status,
});

export const updatedSundayCheckInActionCreator = status => ({
  type: UPDATED_SUNDAY_CHECK_IN_STATUS,
  status,
});

export const updatedMondayCheckInActionCreator = status => ({
  type: UPDATED_MONDAY_CHECK_IN_STATUS,
  status,
});

export const updatedTuesdayCheckInActionCreator = status => ({
  type: UPDATED_TUESDAY_CHECK_IN_STATUS,
  status,
});

export const updatedWednesdayCheckInActionCreator = status => ({
  type: UPDATED_WEDNESDAY_CHECK_IN_STATUS,
  status,
});

export const updatedThursdayCheckInActionCreator = status => ({
  type: UPDATED_THURSDAY_CHECK_IN_STATUS,
  status,
});

export const updatedFridayMinchaCheckInActionCreator = status => ({
  type: UPDATED_FRIDAY_MINCHA_CHECK_IN_STATUS,
  status,
});

// Thunk Creators
export const getUserDataThunkCreator = userId => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      // console.log('userId in getUserDataThunkCreator: ', userId);

      const firestore = getFirestore();

      const userDataRaw = await firestore
        .collection('users')
        .doc(userId)
        .get();

      const userDataObj = userDataRaw.data();

      // console.log('userDataObj in getUserDataThunkCreator: ', userDataObj);

      dispatch(gotUserDataActionCreator(userDataObj));

      dispatch(getUsersAttendanceThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCheckInStatusThunkCreator = (userId, day, status) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      // console.log('userId in updateCheckInStatusThunkCreator: ', userId);
      // console.log('day in updateCheckInStatusThunkCreator: ', day);
      // console.log('status in updateCheckInStatusThunkCreator: ', status);

      const firestore = getFirestore();

      await firestore
        .collection('users')
        .doc(userId)
        .update({
          [day]: status,
        });

      const { user } = getState();

      const newUpdateData = {
        user: user.fullName,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      await firestore
        .collection('updates')
        .doc()
        .set(newUpdateData);

      if (day === 'friday') {
        dispatch(updatedFridayCheckInActionCreator(status));
      } else if (day === 'saturday') {
        dispatch(updatedSaturdayCheckInActionCreator(status));
      } else if (day === 'sunday') {
        dispatch(updatedSundayCheckInActionCreator(status));
      } else if (day === 'monday') {
        dispatch(updatedMondayCheckInActionCreator(status));
      } else if (day === 'tuesday') {
        dispatch(updatedTuesdayCheckInActionCreator(status));
      } else if (day === 'wednesday') {
        dispatch(updatedWednesdayCheckInActionCreator(status));
      } else if (day === 'thursday') {
        dispatch(updatedThursdayCheckInActionCreator(status));
      } else if (day === 'fridayMincha') {
        dispatch(updatedFridayMinchaCheckInActionCreator(status));
      }

      dispatch(getUsersAttendanceThunkCreator());
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
      //   'UPDATED_FRIDAY_CHECK_IN_STATUS: action.status',
      //   action.status
      // );

      return { ...state, friday: action.status };

    case UPDATED_SATURDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_SATURDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, saturday: action.status };

    case UPDATED_SUNDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_SUNDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, sunday: action.status };

    case UPDATED_MONDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_MONDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, monday: action.status };

    case UPDATED_TUESDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_TUESDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, tuesday: action.status };

    case UPDATED_WEDNESDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_WEDNESDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, wednesday: action.status };

    case UPDATED_THURSDAY_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_THURSDAY_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, thursday: action.status };

    case UPDATED_FRIDAY_MINCHA_CHECK_IN_STATUS:
      // console.log(
      //   'UPDATED_FRIDAY_MINCHA_CHECK_IN_STATUS action.status: ',
      //   action.status
      // );

      return { ...state, fridayMincha: action.status };

    default:
      return state;
  }
};

export default userReducer;
