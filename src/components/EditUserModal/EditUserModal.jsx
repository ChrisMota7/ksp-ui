import "./EditUserModal.scss";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, TextField } from '@mui/material';
import { updateUserDetails, getUsers } from '@/redux/actions/userAction';
import { showSnackbar } from '@/redux/actions/visualsAction';

const EditUserModal = ({ openEditUser, handleCloseEditUser, user }) => {
    const dispatch = useDispatch();
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');

    const handleEditUser = async () => {
        const { setUpdateUserSuccess } = await dispatch(updateUserDetails(user.id, newEmail, newPassword));

        if (setUpdateUserSuccess) {
            dispatch(showSnackbar("Usuario actualizado", "success"));
            dispatch(getUsers());
            handleCloseEditUser();
        } else {
            dispatch(showSnackbar("Error al actualizar usuario", "error"));
        }
    };

    const closeModal = () => {
        setNewEmail(user.email);
        setNewPassword('');
        handleCloseEditUser();
    };

    return (
        <div>
            <Modal
                open={openEditUser}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="edit-user">
                    <h1>Editar Usuario</h1>
                    <TextField 
                        onChange={event => setNewEmail(event.target.value)}
                        name='email' 
                        className='edit-user__field' 
                        id="outlined-basic" 
                        label="Correo Electrónico"
                        defaultValue={user.email}
                    />
                    <TextField 
                        onChange={event => setNewPassword(event.target.value)}
                        name='password' 
                        className='edit-user__field' 
                        id="outlined-basic" 
                        label="Nueva Contraseña"
                        type="password"
                    />
                    <div className="edit-user__buttons">
                        <Button 
                            onClick={handleEditUser}
                            disabled={newEmail === "" || newPassword === ""}
                        >
                            Editar
                        </Button>
                        <Button onClick={closeModal}>Cancelar</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EditUserModal;
