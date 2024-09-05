import "./EditUserModal.scss";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { updateUserDetails, getUsers, getEmpresas } from '@/redux/actions/userAction';
import { showSnackbar } from '@/redux/actions/visualsAction';

const EditUserModal = ({ openEditUser, handleCloseEditUser, user }) => {
    const dispatch = useDispatch();
    const [newEmail, setNewEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [empresa, setEmpresa] = useState(user.empresa ? user.empresa.id : '');
    const [telefono, setTelefono] = useState(user.telefono || '');  // Nuevo estado para el teléfono
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        const fetchEmpresas = async () => {
            try {
                const empresasData = await dispatch(getEmpresas());
                setEmpresas(empresasData || []);
            } catch (error) {
                console.error('Error fetching empresas:', error);
                setEmpresas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEmpresas();
    }, [dispatch]);

    const handleEditUser = async () => {
        const { setUpdateUserSuccess } = await dispatch(updateUserDetails(user.id, newEmail, newPassword, empresa, telefono));

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
        setEmpresa(user.empresa ? user.empresa.id : '');
        setTelefono(user.telefono || '');
        setIsModified(false);
        handleCloseEditUser();
    };

    const handleFieldChange = (setter) => (event) => {
        setter(event.target.value);
        setIsModified(true);
    };

    return (
        <div>
            <Modal
                open={openEditUser}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="edit-user">
                    <h1>Editar Usuario</h1>
                    <TextField 
                        onChange={handleFieldChange(setNewEmail)}
                        name='email' 
                        className='edit-user__field' 
                        id="outlined-email"
                        label="Correo Electrónico"
                        defaultValue={user.email}
                    />
                    <TextField 
                        onChange={handleFieldChange(setNewPassword)}
                        name='password' 
                        className='edit-user__field' 
                        id="outlined-password"
                        label="Nueva Contraseña"
                        type="password"
                    />
                    <TextField 
                        onChange={handleFieldChange(setTelefono)}  // Campo para teléfono
                        name='telefono' 
                        className='edit-user__field' 
                        id="outlined-telefono"
                        label="Número de Teléfono"
                        value={telefono}
                    />
                    <FormControl className='edit-user__field'>
                        <InputLabel id="empresa-label">Cliente</InputLabel>
                        {loading ? (
                            <CircularProgress size={24} />
                        ) : (
                            <Select
                                labelId="empresa-label"
                                value={empresa}
                                onChange={handleFieldChange(setEmpresa)}
                                label="Empresa"
                            >
                                {empresas.length > 0 ? (
                                    empresas.map((empresa) => (
                                        <MenuItem key={empresa.id} value={empresa.id}>
                                            {empresa.nombre}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled value="">
                                        No hay empresas disponibles
                                    </MenuItem>
                                )}
                            </Select>
                        )}
                    </FormControl>
                    <div className="edit-user__buttons">
                        <Button 
                            onClick={handleEditUser}
                            disabled={!isModified}
                        >
                            Guardar
                        </Button>
                        <Button onClick={closeModal}>Cancelar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditUserModal;