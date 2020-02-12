import { getUserDataThunkCreator } from './userReducer';
import { getUsersMaarivAttendanceThunkCreator } from './maarivAttendanceReducer';

// Initial State
const initialState = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  saturday: false,
};

// Action Types
const GOT_MAARIV_CHECK_IN_STATUSES = 'GOT_MAARIV_CHECK_IN_STATUSES';
const UPDATED_MAARIV_CHECK_IN_STATUS = 'UPDATED_MAARIV_CHECK_IN_STATUS';

// Action Creators
export const gotMaarivCheckInStatusesActionCreator = statuses => ({
  type: GOT_MAARIV_CHECK_IN_STATUSES,
  statuses,
});

export const updatedMaarivCheckInStatusActionCreator = (day, status) => ({
  type: UPDATED_MAARIV_CHECK_IN_STATUS,
  day,
  status,
});

// Thunk Creators
export const getMaarivCheckInStatusesThunkCreator = () => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { uid } = JSON.parse(localStorage.getItem('minyanTracker'));

      const userDataRaw = await firestore
        .collection('users')
        .doc(uid)
        .get();

      const { maariv } = userDataRaw.data();

      dispatch(gotMaarivCheckInStatusesActionCreator(maariv));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMaarivCheckInStatusThunkCreator = (day, status) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();

      const { uid, fullName, congregation } = JSON.parse(
        localStorage.getItem('minyanTracker')
      );

      await firestore
        .collection('users')
        .doc(uid)
        .set(
          {
            maariv: {
              [day]: status,
            },
          },
          { merge: true }
        );

      const newUpdateData = {
        uid,
        fullName,
        congregation,
        timestamp: firestore.FieldValue.serverTimestamp(),
      };

      await firestore
        .collection('updates')
        .doc()
        .set(newUpdateData);

      dispatch(updatedMaarivCheckInStatusActionCreator(day, status));

      dispatch(getUserDataThunkCreator());
      dispatch(getUsersMaarivAttendanceThunkCreator());
    } catch (error) {
      console.error(error);
    }
  };
};

// Reducer
const maarivCheckInReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MAARIV_CHECK_IN_STATUSES:
      return {
        ...state,
        sunday: action.statuses.sunday,
        monday: action.statuses.monday,
        tuesday: action.statuses.tuesday,
        wednesday: action.statuses.wednesday,
        thursday: action.statuses.thursday,
        saturday: action.statuses.saturday,
      };

    case UPDATED_MAARIV_CHECK_IN_STATUS:
      return { ...state, [action.day]: action.status };

    default:
      return state;
  }
};

export default maarivCheckInReducer;
