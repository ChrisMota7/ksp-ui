import { Button } from "@mui/material"
import "./UserCard.scss"
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";

const UserCard = ({ userid, name, email, createdAt, isAdmin = false, filteredUser = false }) => {
  const dispatch = useDispatch()

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false)
  }
  
  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true)
  }

  const handleDelete = async () => {
    const { setUserDeletedSuccessfully } = await dispatch(deleteUser(userid))

    if (setUserDeletedSuccessfully) {
      dispatch(showSnackbar("Usuario eliminado satisfactoriamente", "success"))
      setOpenDeleteConfirmation(false)
      dispatch(getUsers())
    } else {
      dispatch(showSnackbar("Error al eliminar", "error"))
    }
  }

  return (
    <div className='user-card'>
        <p className="user-card__fullname">{name}</p>
        <p>{email}</p>
        {filteredUser && (
          <p className="user-card__typeOfUser">{isAdmin ? "Administrador" : "Colaborador"}</p>
        )}
        <p>Creación: {new Date(createdAt).toLocaleDateString()}</p>
        <div className="user-card__delete">
            <Button onClick={handleOpenDeleteConfirmation}>Eliminar</Button>
        </div>

        <Dialog
            open={openDeleteConfirmation}
            onClose={handleCloseDeleteConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                ¿Desea eliminar a este usuario?
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Al confirmar, se eliminará al usuario {name} y ya no tendrá acceso a la aplicación.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDeleteConfirmation} autoFocus>Cancelar</Button>
            <Button onClick={handleDelete}>
                Eliminar
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default UserCard