/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable max-statements */

// Initial State
const initialState = {
  friday: {
    day: 'Friday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  saturday: {
    day: 'Saturday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_SHABBAT_ATTENDANCE = 'GOT_USERS_SHABBAT_ATTENDANCE';

// Action Creators
export const gotUsersShabbatAttendanceActionCreator = (
  fridayAttendance,
  saturdayAttendance
) => ({
  type: GOT_USERS_SHABBAT_ATTENDANCE,
  fridayAttendance,
  saturdayAttendance,
});

// Thunk Creators
export const getUsersShabbatAttendanceThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { user } = getState();

      // console.log('user in getUsersShabbatAttendanceThunkCreator: ', user);

      const { docs } = await firestore
        .collection('users')
        .where('congregation', '==', user.congregation)
        .get();

      const fridayAttendance = {
        going: [],
        notGoing: [],
      };

      const saturdayAttendance = {
        going: [],
        notGoing: [],
      };

      let curUser;

      for (let doc of docs) {
        curUser = doc.data();

        // console.log('curUser in getUsersShabbatAttendanceThunkCreator: ', curUser);

        if (curUser.friday) {
          fridayAttendance.going.push(curUser);
        } else {
          fridayAttendance.notGoing.push(curUser);
        }

        if (curUser.saturday) {
          saturdayAttendance.going.push(curUser);
        } else {
          saturdayAttendance.notGoing.push(curUser);
        }
      }

      dispatch(
        gotUsersShabbatAttendanceActionCreator(
          fridayAttendance,
          saturdayAttendance
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_SHABBAT_ATTENDANCE:
      // console.log(
      //   'GOT_USERS_SHABBAT_ATTENDANCE',
      //   'action.fridayAttendance: ',
      //   action.fridayAttendance,
      //   'action.saturdayAttendance: ',
      //   action.saturdayAttendance,
      // );

      return {
        ...state,
        friday: {
          ...state.friday,
          going: action.fridayAttendance.going,
          notGoing: action.fridayAttendance.notGoing,
        },
        saturday: {
          ...state.saturday,
          going: action.saturdayAttendance.going,
          notGoing: action.saturdayAttendance.notGoing,
        },
      };

    default:
      return state;
  }
};

export default attendanceReducer;
