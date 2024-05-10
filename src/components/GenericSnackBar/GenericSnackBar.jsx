import { closeSnackbar } from '@/redux/actions/visualsAction'
import { selectShowSnackbar, selectSnackbarMessage, selectSnackbarSeverity } from '@/redux/reducers/visualsReducer'
import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GenericSnackBar = () => {
    const dispatch = useDispatch()
    const snackBarOpen = useSelector(selectShowSnackbar)
    const snackBarMessage = useSelector(selectSnackbarMessage)
    const snackBarSeverity= useSelector(selectSnackbarSeverity)

    const handleClose = () => {
        dispatch(closeSnackbar())
    }

    return (
        <div>
            <Snackbar
                open={snackBarOpen}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={snackBarSeverity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default GenericSnackBar