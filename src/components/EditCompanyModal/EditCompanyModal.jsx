import './EditCompanyModal.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateEmpresa, getEmpresasTable } from '@/redux/actions/empresaAction';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { Box, Button, Modal, TextField } from '@mui/material';

const EditCompanyModal = ({ open, handleClose, empresa }) => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState("");

    useEffect(() => {
        if (empresa) setNombre(empresa.nombre);
    }, [empresa]);

    const handleUpdate = async () => {
        const result = await dispatch(updateEmpresa(empresa.id, { nombre }));
        if (result.setUpdateEmpresaSuccess) {
            dispatch(showSnackbar("Empresa actualizada exitosamente", "success"));
            dispatch(getEmpresasTable());  // Refresca la lista de empresas
            handleClose();
        } else {
            dispatch(showSnackbar("Error al actualizar la empresa", "error"));
        }
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box className="edit-company">
                    <h1>Editar Cliente</h1>
                    <TextField 
                        onChange={event => setNombre(event.target.value)}
                        name='nombre' 
                        className='edit-company__name' 
                        id="outlined-basic" 
                        label="Nombre"
                        value={nombre}
                        fullWidth
                        margin="dense"
                    />
                    <div className="edit-company__buttons">
                        <Button 
                            onClick={handleUpdate}
                            disabled={nombre === ""}
                        >Actualizar</Button>
                        <Button onClick={handleClose}>Cancelar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCompanyModal;
