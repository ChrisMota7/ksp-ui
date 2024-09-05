import { Button, IconButton } from "@mui/material";
import "./UserCard.scss";
import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { deleteUser, getUsers } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

const UserCard = ({ userid, name, email, createdAt, isAdmin = false, filteredUser = false, onEdit, empresa, telefono }) => {
  const dispatch = useDispatch();

  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const handleCloseDeleteConfirmation = () => {
    setOpenDeleteConfirmation(false);
  };
  
  const handleOpenDeleteConfirmation = () => {
    setOpenDeleteConfirmation(true);
  };

  const handleDelete = async () => {
    const { setUserDeletedSuccessfully } = await dispatch(deleteUser(userid));

    if (setUserDeletedSuccessfully) {
      dispatch(showSnackbar("Usuario eliminado satisfactoriamente", "success"));
      setOpenDeleteConfirmation(false);
      dispatch(getUsers());
    } else {
      dispatch(showSnackbar("Error al eliminar", "error"));
    }
  };

  return (
    <div className='user-card'>
        <p className="user-card__fullname" data-testid="username">{name}</p>
        <p>{email}</p>
        <p>Teléfono: {telefono}</p>
        {empresa && <p>Empresa: {empresa}</p>}
        {filteredUser && (
          <p className="user-card__typeOfUser">{isAdmin ? "Administrador" : "Colaborador"}</p>
        )}
        <p>Creación: {new Date(createdAt).toLocaleDateString()}</p>
        <div className="user-card__delete">
            <IconButton data-testid="delete-button" onClick={handleOpenDeleteConfirmation}>
              <DeleteIcon />
            </IconButton>
            <IconButton data-testid="edit-button" onClick={onEdit}>
              <EditNoteIcon />
            </IconButton>
        </div>

        <Dialog
            open={openDeleteConfirmation}
            onClose={handleCloseDeleteConfirmation}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              sx: {
                borderRadius: '10px',
                padding: '10px',
                margin: '10px',
                boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.79)'
              }
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>
                ¿Desea eliminar a este usuario?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Al confirmar, se eliminará al usuario {name} y ya no tendrá acceso a la aplicación.
              </DialogContentText>  
            </DialogContent>
            <DialogActions>
              <Button className="user-card__delete__button" data-testid="dialog-delete-button" onClick={handleDelete}>
                Eliminar
              </Button>
              <Button data-testid="dialog-cancel-button" onClick={handleCloseDeleteConfirmation} autoFocus>
                Cancelar
              </Button>
            </DialogActions>
        </Dialog>
    </div>
  );
};

export default UserCard;
