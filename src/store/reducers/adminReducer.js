import defaultAttendees from '../../config/attendanceConfig';

// Initial State
const initialState = {
  disabled: false,
};

// Action Types
const RESET_USERS_ATTENDANCE = 'RESET_USERS_ATTENDANCE';

// Action Creators
const resetUsersAttendanceActionCreator = () => ({
  type: RESET_USERS_ATTENDANCE,
});

// Thunks
export const resetUsersAttendanceThunkCreator = users => {
  return (dispatch, getState, { getFirestore }) => {
    try {
      // console.log('users in resetUsersAttendanceThunkCreator: ', users);

      const firestore = getFirestore();

      const usersUpdatesUnresolvedPromises = users.reduce((acc, curUser) => {
        const { id, email } = curUser;

        const isDefaultAttendee =
          email === defaultAttendees[0].email ||
          email === defaultAttendees[1].email;

        acc.push(
          firestore
            .collection('users')
            .doc(id)
            .update({
              friday: isDefaultAttendee,
              saturday: isDefaultAttendee,
              sunday: false,
              monday: false,
              tuesday: false,
              wednesday: false,
              thursday: false,
              fridayMincha: false,
            })
        );

        return acc;
      }, []);

      // console.log(
      //   'usersUpdatesUnresolvedPromises in resetUsersAttendanceThunkCreator: ',
      //   usersUpdatesUnresolvedPromises
      // );

      Promise.all(usersUpdatesUnresolvedPromises);

      dispatch(resetUsersAttendanceActionCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_USERS_ATTENDANCE:
      return {
        ...state,
        disabled: true,
      };

    default:
      return state;
  }
};

export default adminReducer;
