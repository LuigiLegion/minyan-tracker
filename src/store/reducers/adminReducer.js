// Imports
import defaultAttendees from '../../config/attendanceConfig';

// Initial State
const initialState = {
  disabled: false,
};

// Action Types
const RESET_USERS_ATTENDANCE = 'RESET_USERS_ATTENDANCE';

// Action Creators
export const resetUsersAttendanceActionCreator = () => ({
  type: RESET_USERS_ATTENDANCE,
});

// Thunk Creators
export const resetUsersAttendanceThunkCreator = users => {
  return (dispatch, getState, { getFirestore }) => {
    try {
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
            .set(
              {
                shacharit: {
                  sunday: false,
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                },
                mincha: {
                  sunday: false,
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false,
                },
                maariv: {
                  sunday: false,
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  saturday: false,
                },
                shabbat: {
                  friday: isDefaultAttendee,
                  saturday: isDefaultAttendee,
                },
              },
              { merge: true }
            )
        );

        return acc;
      }, []);

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

// Exports
export default adminReducer;
