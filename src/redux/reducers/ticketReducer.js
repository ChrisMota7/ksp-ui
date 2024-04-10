export const SET_PROBLEMS = "SET_PROBLEMS"

export const defaultState = {
  problems: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROBLEMS:
      return {
        ...state,
        problems: action.payload
      };
    default:
      return state;
  }
};

export default reducer

export const selectProblems = (state) => state.ticketReducer.problems