// Initial State
const initialState = {
  friday: {
    going: [],
    notGoing: [],
  },
  saturday: {
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_ATTENDANCE = 'GOT_USERS_ATTENDANCE';

// Action Creators
const gotUsersAttendanceActionCreator = (
  fridayAttendance,
  saturdayAttendance
) => ({
  type: GOT_USERS_ATTENDANCE,
  fridayAttendance,
  saturdayAttendance,
});

// Thunks
export const getUsersAttendanceThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { user } = getState();

      // console.log('user in getUsersAttendanceThunkCreator: ', user);

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

        // console.log('curUser in getUsersAttendanceThunkCreator: ', curUser);

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
        gotUsersAttendanceActionCreator(fridayAttendance, saturdayAttendance)
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_ATTENDANCE:
      // console.log(
      //   'GOT_USERS_ATTENDANCE action.fridayAttendance: ',
      //   action.fridayAttendance,
      //   'action.saturdayAttendance: ',
      //   action.saturdayAttendance
      // );

      return {
        ...state,
        friday: {
          going: action.fridayAttendance.going,
          notGoing: action.fridayAttendance.notGoing,
        },
        saturday: {
          going: action.saturdayAttendance.going,
          notGoing: action.saturdayAttendance.notGoing,
        },
      };

    default:
      return state;
  }
};

export default attendanceReducer;
