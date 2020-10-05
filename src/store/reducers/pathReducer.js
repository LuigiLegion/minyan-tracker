// Initial State
const initialState = {
  path: '',
};

// Action Types
const GOT_PATH = 'GOT_PATH';

// Action Creators
export const gotPathActionCreator = path => ({
  type: GOT_PATH,
  path,
});

// Reducer
const pathReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PATH:
      return {
        ...state,
        path: action.path,
      };

    default:
      return state;
  }
};

// Exports
export default pathReducer;
