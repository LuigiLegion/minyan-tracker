/* eslint-disable complexity */
/* eslint-disable max-params */
/* eslint-disable max-statements */

// Initial State
const initialState = {
  sunday: {
    day: 'Sunday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
  monday: {
    day: 'Monday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
  tuesday: {
    day: 'Tuesday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
  wednesday: {
    day: 'Wednesday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
  thursday: {
    day: 'Thursday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
  friday: {
    day: 'Friday',
    type: 'Shacharit',
    going: [],
    notGoing: [],
  },
};

// Action Types
const GOT_USERS_SHACHARIT_ATTENDANCE = 'GOT_USERS_SHACHARIT_ATTENDANCE';

// Action Creators
export const gotUsersShacharitAttendanceActionCreator = (
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayAttendance
) => ({
  type: GOT_USERS_SHACHARIT_ATTENDANCE,
  sundayAttendance,
  mondayAttendance,
  tuesdayAttendance,
  wednesdayAttendance,
  thursdayAttendance,
  fridayAttendance,
});

// Thunk Creators
export const getUsersShacharitAttendanceThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      // const { firebase } = getState();
      // const { profile } = firebase;
      // const { congregation } = profile;

      // console.log(
      //   'congregation in getUsersShacharitAttendanceThunkCreator: ',
      //   congregation
      // );

      const { docs } = await firestore
        .collection('users')
        .where('congregation', '==', localStorage.congregation)
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

      let curUser;

      for (let doc of docs) {
        curUser = doc.data();

        // console.log('curUser in getUsersShacharitAttendanceThunkCreator: ', curUser);

        if (curUser.shacharit.sunday) {
          sundayAttendance.going.push(curUser);
        } else {
          sundayAttendance.notGoing.push(curUser);
        }

        if (curUser.shacharit.monday) {
          mondayAttendance.going.push(curUser);
        } else {
          mondayAttendance.notGoing.push(curUser);
        }

        if (curUser.shacharit.tuesday) {
          tuesdayAttendance.going.push(curUser);
        } else {
          tuesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.shacharit.wednesday) {
          wednesdayAttendance.going.push(curUser);
        } else {
          wednesdayAttendance.notGoing.push(curUser);
        }

        if (curUser.shacharit.thursday) {
          thursdayAttendance.going.push(curUser);
        } else {
          thursdayAttendance.notGoing.push(curUser);
        }

        if (curUser.shacharit.friday) {
          fridayAttendance.going.push(curUser);
        } else {
          fridayAttendance.notGoing.push(curUser);
        }
      }

      dispatch(
        gotUsersShacharitAttendanceActionCreator(
          sundayAttendance,
          mondayAttendance,
          tuesdayAttendance,
          wednesdayAttendance,
          thursdayAttendance,
          fridayAttendance
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const shacharitAttendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USERS_SHACHARIT_ATTENDANCE:
      // console.log(
      //   'GOT_USERS_SHACHARIT_ATTENDANCE',
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
      };

    default:
      return state;
  }
};

export default shacharitAttendanceReducer;
