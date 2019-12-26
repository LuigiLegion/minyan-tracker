/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable max-statements */

// Initial State
const initialState = {
  sunday: {
    day: 'Sunday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  monday: {
    day: 'Monday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  tuesday: {
    day: 'Tuesday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  wednesday: {
    day: 'Wednesday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  thursday: {
    day: 'Thursday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  friday: {
    day: 'Friday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
  saturday: {
    day: 'Saturday',
    type: 'Mincha',
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_MINCHA_ATTENDANCE = 'GOT_USERS_MINCHA_ATTENDANCE';

// Action Creators
export const gotUsersMinchaAttendanceActionCreator = (
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayAttendance,
  saturdayAttendance
) => ({
  type: GOT_USERS_MINCHA_ATTENDANCE,
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayAttendance,
  saturdayAttendance,
});

// Thunk Creators
export const getUsersMinchaAttendanceThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { user } = getState();

      // console.log('user in getUsersMinchaAttendanceThunkCreator: ', user);

      const { docs } = await firestore
        .collection('users')
        .where('congregation', '==', user.congregation)
        .get();

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

        // console.log('curUser in getUsersMinchaAttendanceThunkCreator: ', curUser);

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
        gotUsersMinchaAttendanceActionCreator(
          sundayAttendance,
          mondayAttendance,
          tuesdayAttendance,
          wednesdayAttendance,
          thursdayAttendance,
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
const minchaAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_MINCHA_ATTENDANCE:
      // console.log(
      //   'GOT_USERS_MINCHA_ATTENDANCE',
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
      //   'action.fridayAttendance: ',
      //   action.fridayAttendance,
      //   'action.saturdayAttendance: ',
      //   action.saturdayAttendance
      // );

      return {
        ...state,
        sunday: {
          ...state.sunday,
          going: action.sundayAttendance.going,
          notGoing: action.sundayAttendance.notGoing,
        },
        monday: {
          ...state.monday,
          going: action.mondayAttendance.going,
          notGoing: action.mondayAttendance.notGoing,
        },
        tuesday: {
          ...state.tuesday,
          going: action.tuesdayAttendance.going,
          notGoing: action.tuesdayAttendance.notGoing,
        },
        wednesday: {
          ...state.wednesday,
          going: action.wednesdayAttendance.going,
          notGoing: action.wednesdayAttendance.notGoing,
        },
        thursday: {
          ...state.thursday,
          going: action.thursdayAttendance.going,
          notGoing: action.thursdayAttendance.notGoing,
        },
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

export default minchaAttendanceReducer;
