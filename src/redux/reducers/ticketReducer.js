export const SET_PROBLEMS = "SET_PROBLEMS"
export const SET_TICKETS_TABLE = "SET_TICKETS_TABLE"
export const SET_VER_TICKET = "SET_VER_TICKET"
export const SET_TICKETS_DUPLICATION = "SET_TICKETS_DUPLICATION"

export const defaultState = {
  problems: [],
  tickets: [],
  ticketsDuplication: [],
};

const ticketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROBLEMS:
      return {
        ...state,
        problems: action.payload
      };
    case SET_TICKETS_TABLE:
      return {
        ...state,
        tickets: action.payload
      }
    case SET_TICKETS_DUPLICATION:
      return {
        ...state,
        ticketsDuplication: action.payload
      }
    default:
      return state;
  }
};

export default ticketReducer

export const selectProblems = (state) => state.ticketReducer.problems
export const TicketVer = (state) => state.ticketReducer.verTicket
export const selectTickets = (state) => state.ticketReducer.tickets
export const selectTicketsDuplication = (state) => state.ticketReducer.ticketsDuplication