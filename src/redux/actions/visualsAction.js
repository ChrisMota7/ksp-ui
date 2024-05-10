import { HIDE_SNACKBAR, SHOW_SNACKBAR } from "../reducers/visualsReducer"

export const showSnackbar = (message, severity) => (dispatch) => {
    dispatch({
        type: SHOW_SNACKBAR,
        payload: {
            message: message,
            severity: severity
        }
    })
}

export const closeSnackbar = () => (dispatch) => {
    dispatch({
        type: HIDE_SNACKBAR
    })
}