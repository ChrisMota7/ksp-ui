export const AUTHENTICATE_USER = "AUTHENTICATE_USER"

export const defaultState = {
  userid: undefined,
  jwt: undefined
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        userid: action.payload.userid,
        jwt: action.payload.jwt
      };
    default:
      return state;
  }
};

export default reducer

export const selectJWT = (state) => state.ticketReducer.jwt
export const selectUserid = (state) => state.ticketReducer.userid