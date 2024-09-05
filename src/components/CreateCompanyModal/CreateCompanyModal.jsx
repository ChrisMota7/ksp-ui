import './CreateCompanyModal.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEmpresa, getEmpresasTable } from '@/redux/actions/empresaAction';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const CreateCompanyModal = ({ open, handleClose }) => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');

    const handleCreate = async () => {
        const result = await dispatch(createEmpresa(nombre));
        if (result.empresaCreatedSuccessfully) {
            dispatch(showSnackbar("Cliente creado exitosamente", "success"));
            dispatch(getEmpresasTable());
            handleClose();
        } else {
            dispatch(showSnackbar("Error al crear el cliente", "error"));
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{ className: 'create-company-dialog' }}>
            <DialogTitle className="create-company-dialog__title">Nuevo Cliente</DialogTitle>
            <DialogContent className="create-company-dialog__content">
                <TextField 
                    required 
                    label="Nombre del nuevo cliente" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    fullWidth
                    margin="dense"
                    className="create-company-dialog__input"
                />
            </DialogContent>
            <DialogActions className="create-company-dialog__actions">
                <Button onClick={handleCreate} disabled={!nombre} className="create-company-dialog__button create">Crear</Button>
                <Button onClick={handleClose} className="create-company-dialog__button cancel">Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateCompanyModal;
