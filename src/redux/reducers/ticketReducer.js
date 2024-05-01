export const SET_PROBLEMS = "SET_PROBLEMS"
export const SET_TICKETS_TABLE = "SET_TICKETS_TABLE"
export const SET_TICKET_INFO = "SET_TICKETS_INFO"
export const SET_TICKETS_DUPLICATION = "SET_TICKETS_DUPLICATION"
export const SET_PRIORIDAD = "SET_PRIORIDAD"

export const defaultState = {
  problems: [],
  tickets: [],
  ticketsDuplication: [],
  ticketsInfo: [],
  ticketFiles: [],
  messages: [],
};

const ticketReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROBLEMS:
      return {
        ...state,
        problems: action.payload
      };
    case SET_TICKET_INFO:
      return {
        ...state,
        ticketInfo: action.payload.ticketInfo, 
        ticketFiles: action.payload.ticketFiles,
        messages : action.payload.messages
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
export const selectTicketInfo = (state) => state.ticketReducer.ticketInfo
export const selectTickets = (state) => state.ticketReducer.tickets
export const selectTicketsDuplication = (state) => state.ticketReducer.ticketsDuplication
export const selectTicketMessages = (state) => state.ticketReducer.messages
export const selectTicketFiles = (state) => state.ticketReducer.ticketFiles