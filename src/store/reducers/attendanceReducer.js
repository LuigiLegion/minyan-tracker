/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable max-statements */

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
  sunday: {
    going: [],
    notGoing: [],
  },
  monday: {
    going: [],
    notGoing: [],
  },
  tuesday: {
    going: [],
    notGoing: [],
  },
  wednesday: {
    going: [],
    notGoing: [],
  },
  thursday: {
    going: [],
    notGoing: [],
  },
  fridayMincha: {
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_ATTENDANCE = 'GOT_USERS_ATTENDANCE';

// Action Creators
const gotUsersAttendanceActionCreator = (
  fridayAttendance,
  saturdayAttendance,
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayMinchaAttendance
) => ({
  type: GOT_USERS_ATTENDANCE,
  fridayAttendance,
  saturdayAttendance,
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayMinchaAttendance,
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

      const sundayAttendance = {
        going: [],
        notGoing: [],
      };

      const mondayAttendance = {
        going: [],
        notGoing: [],
      };

      const tuesdayAttendance = {
        going: [],
        notGoing: [],
      };

      const wednesdayAttendance = {
        going: [],
        notGoing: [],
      };

      const thursdayAttendance = {
        going: [],
        notGoing: [],
      };

      const fridayMinchaAttendance = {
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

        if (curUser.sunday) {
          sundayAttendance.going.push(curUser);
        } else {
          sundayAttendance.notGoing.push(curUser);
        }

        if (curUser.monday) {
          mondayAttendance.going.push(curUser);
        } else {
          mondayAttendance.notGoing.push(curUser);
        }

        if (curUser.tuesday) {
          tuesdayAttendance.going.push(curUser);
        } else {
          tuesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.wednesday) {
          wednesdayAttendance.going.push(curUser);
        } else {
          wednesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.thursday) {
          thursdayAttendance.going.push(curUser);
        } else {
          thursdayAttendance.notGoing.push(curUser);
        }

        if (curUser.fridayMincha) {
          fridayMinchaAttendance.going.push(curUser);
        } else {
          fridayMinchaAttendance.notGoing.push(curUser);
        }
      }

      dispatch(
        gotUsersAttendanceActionCreator(
          fridayAttendance,
          saturdayAttendance,
          sundayAttendance,
          mondayAttendance,
          tuesdayAttendance,
          wednesdayAttendance,
          thursdayAttendance,
          fridayMinchaAttendance
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
    case GOT_USERS_ATTENDANCE:
      // console.log(
      //   'GOT_USERS_ATTENDANCE',
      //   'action.fridayAttendance: ',
      //   action.fridayAttendance,
      //   'action.saturdayAttendance: ',
      //   action.saturdayAttendance,
      //   'action.sundayAttendance: ',
      //   action.sundayAttendance,
      //   'action.mondayAttendance: ',
      //   action.mondayAttendance,
      //   'action.tuesdayAttendance: ',
      //   action.tuesdayAttendance,
      //   'action.wednesdayAttendance: ',
      //   action.wednesdayAttendance,
      //   'action.thursdayAttendance: ',
      //   action.thursdayAttendance,
      //   'action.fridayMinchaAttendance: ',
      //   action.fridayMinchaAttendance
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
        sunday: {
          going: action.sundayAttendance.going,
          notGoing: action.sundayAttendance.notGoing,
        },
        monday: {
          going: action.mondayAttendance.going,
          notGoing: action.mondayAttendance.notGoing,
        },
        tuesday: {
          going: action.tuesdayAttendance.going,
          notGoing: action.tuesdayAttendance.notGoing,
        },
        wednesday: {
          going: action.wednesdayAttendance.going,
          notGoing: action.wednesdayAttendance.notGoing,
        },
        thursday: {
          going: action.thursdayAttendance.going,
          notGoing: action.thursdayAttendance.notGoing,
        },
        fridayMincha: {
          going: action.fridayMinchaAttendance.going,
          notGoing: action.fridayMinchaAttendance.notGoing,
        },
      };

    default:
      return state;
  }
};

export default attendanceReducer;
