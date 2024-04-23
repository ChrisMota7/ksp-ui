import verTicket from "@/app/tickets/ViewTicket/ViewTicket";

export const SET_PROBLEMS = "SET_PROBLEMS"
export const SET_TICKETS_TABLE = "SET_TICKETS_TABLE"
export const SET_VER_TICKET = "SET_VER_TICKET"

export const defaultState = {
  problems: [],
  ticketsTable: [],
  verTicket: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROBLEMS:
      return {
        ...state,
        problems: action.payload
      };
    case SET_TICKETS_TABLE:
      return {
        ...state,
        ticketsTable: action.payload
      }
    case SET_VER_TICKET:
      return{
        ...state,
        verTicket: action.payload
      }
    default:
      return state;
  }
};

export default reducer

export const selectProblems = (state) => state.ticketReducer.problems
export const TicketVer = (state) => state.ticketReducer.verTicket