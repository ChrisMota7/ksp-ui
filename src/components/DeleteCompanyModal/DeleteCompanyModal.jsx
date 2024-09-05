import './DeleteCompanyModal.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteEmpresa, getEmpresasTable } from '@/redux/actions/empresaAction';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { showSnackbar } from '@/redux/actions/visualsAction';

const DeleteCompanyModal = ({ open, handleClose, empresa }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const { setDeleteEmpresaSuccess } = await dispatch(deleteEmpresa(empresa.id));
        if (setDeleteEmpresaSuccess) {
            dispatch(showSnackbar("Cliente eliminado satisfactoriamente", "success"));
            dispatch(getEmpresasTable());  // Refresca la lista de empresas
            handleClose();
        } else {
            dispatch(showSnackbar("No se pudo eliminar el cliente", "error"));
        }
    };

    return (
        <div className='delete-company'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle className='delete-company__title'>Eliminar Cliente</DialogTitle>
                <DialogContent className='delete-company__content'>
                    <DialogContentText>¿Está seguro de que desea eliminar el cliente {empresa.nombre}?</DialogContentText>
                </DialogContent>
                <DialogActions className='delete-company__actions'>
                    <Button onClick={handleDelete} className='delete-company__button delete-company__button--delete'>Eliminar</Button>
                    <Button onClick={handleClose} className='delete-company__button delete-company__button--cancel'>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteCompanyModal;
