export const SHOW_SNACKBAR = "SHOW_SNACKBAR"
export const HIDE_SNACKBAR = "HIDE_SNACKBAR"

export const defaultState = {
  showSnackBar: false,
  snackBarMessage: undefined,
  snackBarSeverity: undefined,
};

const visualsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_SNACKBAR:
      return {
        ...state,
        showSnackBar: true,
        snackBarMessage: action.payload.message,
        snackBarSeverity: action.payload.severity
      };
    case HIDE_SNACKBAR:
      return {
        ...state,
        showSnackBar: false,
        snackBarMessage: undefined,
        snackBarSeverity: undefined
      };
    default:
      return state;
  }
};

export default visualsReducer

export const selectShowSnackbar = (state) => state.visualsReducer.showSnackBar
export const selectSnackbarMessage = (state) => state.visualsReducer.snackBarMessage
export const selectSnackbarSeverity = (state) => state.visualsReducer.snackBarSeverity