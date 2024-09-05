export const SET_USERS = "SET_USERS"
export const SET_EMPRESAS = "SET_EMPRESAS"
export const SET_FILTERED_USERS = "SET_FILTERED_USERS"
export const REMOVE_USERS_FILTER = "REMOVE_USERS_FILTER"

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';

export const defaultState = {
  loading: false,
  error: null,
  success: false,
  clientUsers: [],
  adminUsers: [],
  filteredUsers: [],
  empresas: [],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        clientUsers: action.payload.clientUsers,
        adminUsers: action.payload.adminUsers
      };
    case SET_EMPRESAS:
      return {
        ...state,
        empresas: action.payload || []
      };
    case SET_FILTERED_USERS:
      return {
        ...state,
        filteredUsers: action.payload || []
      };
    case REMOVE_USERS_FILTER:
      return {
        ...state,
        filteredUsers: []
      };
    case RESET_PASSWORD_REQUEST:
        return { 
          ...state, 
          loading: true, error: null };
    case RESET_PASSWORD_SUCCESS:
        return { 
          ...state, 
          loading: false, success: true };
    case RESET_PASSWORD_FAILURE:
        return { 
          ...state, 
          loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userReducer

export const selectClientUsers = (state) => state.userReducer.clientUsers
export const selectAdminUsers = (state) => state.userReducer.adminUsers
export const selectFilteredUsers = (state) => state.userReducer.filteredUsers
export const selectEmpresas = (state) => state.userReducer.empresas;