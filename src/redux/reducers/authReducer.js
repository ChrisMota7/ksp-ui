export const AUTHENTICATE_USER = "AUTHENTICATE_USER"

export const defaultState = {
  jwt: undefined,
  userid: undefined,
  isAdmin: false,
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        jwt: action.payload.jwt,
        userid: action.payload.userid,
        isAdmin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};

export default authReducer

export const selectJWT = (state) => state.authReducer.jwt
export const selectUserid = (state) => state.authReducer.userid
export const selectIsAdmin = (state) => state.authReducer.isAdmin