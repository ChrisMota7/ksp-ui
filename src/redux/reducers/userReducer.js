export const SET_USERS = "SET_USERS"
export const SET_FILTERED_USERS = "SET_FILTERED_USERS"
export const REMOVE_USERS_FILTER = "REMOVE_USERS_FILTER"

export const defaultState = {
  clientUsers: [],
  adminUsers: [],
  filteredUsers: [],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        clientUsers: action.payload.clientUsers,
        adminUsers: action.payload.adminUsers
      };
    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload
      };
    case REMOVE_USERS_FILTER:
      return {
        ...state,
        filteredUsers: []
      };
    default:
      return state;
  }
};

export default userReducer

export const selectClientUsers = (state) => state.userReducer.clientUsers
export const selectAdminUsers = (state) => state.userReducer.adminUsers
export const selectFilteredUsers = (state) => state.userReducer.filteredUsers