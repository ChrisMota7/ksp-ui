export const SET_USERS = "SET_USERS"

export const defaultState = {
  clientUsers: [],
  adminUsers: [],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        clientUsers: action.payload.clientUsers,
        adminUsers: action.payload.adminUsers
      };
    default:
      return state;
  }
};

export default userReducer

export const selectClientUsers = (state) => state.userReducer.clientUsers
export const selectAdminUsers = (state) => state.userReducer.adminUsers