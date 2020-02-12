/* eslint-disable complexity */
/* eslint-disable max-statements */

// Initial State
const initialState = {
  sunday: {
    day: 'Sunday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  monday: {
    day: 'Monday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  tuesday: {
    day: 'Tuesday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  wednesday: {
    day: 'Wednesday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  thursday: {
    day: 'Thursday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
  saturday: {
    day: 'Saturday',
    type: 'Maariv',
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_MAARIV_ATTENDANCE = 'GOT_USERS_MAARIV_ATTENDANCE';

// Action Creators
export const gotUsersMaarivAttendanceActionCreator = (
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  saturdayAttendance
) => ({
  type: GOT_USERS_MAARIV_ATTENDANCE,
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  saturdayAttendance,
});

// Thunk Creators
export const getUsersMaarivAttendanceThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { congregation } = JSON.parse(
        localStorage.getItem('minyanTracker')
      );

      const { docs } = await firestore
        .collection('users')
        .where('congregation', '==', congregation)
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

      const saturdayAttendance = {
        going: [],
        notGoing: [],
      };

      let curUser;

      for (let doc of docs) {
        curUser = doc.data();

        if (curUser.maariv.sunday) {
          sundayAttendance.going.push(curUser);
        } else {
          sundayAttendance.notGoing.push(curUser);
        }

        if (curUser.maariv.monday) {
          mondayAttendance.going.push(curUser);
        } else {
          mondayAttendance.notGoing.push(curUser);
        }

        if (curUser.maariv.tuesday) {
          tuesdayAttendance.going.push(curUser);
        } else {
          tuesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.maariv.wednesday) {
          wednesdayAttendance.going.push(curUser);
        } else {
          wednesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.maariv.thursday) {
          thursdayAttendance.going.push(curUser);
        } else {
          thursdayAttendance.notGoing.push(curUser);
        }

        if (curUser.maariv.saturday) {
          saturdayAttendance.going.push(curUser);
        } else {
          saturdayAttendance.notGoing.push(curUser);
        }
      }

      dispatch(
        gotUsersMaarivAttendanceActionCreator(
          sundayAttendance,
          mondayAttendance,
          tuesdayAttendance,
          wednesdayAttendance,
          thursdayAttendance,
          saturdayAttendance
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const maarivAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_MAARIV_ATTENDANCE:
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

export default maarivAttendanceReducer;
