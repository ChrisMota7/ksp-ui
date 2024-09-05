import './DeleteTipoIncidenteModal.scss';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTipoIncidente, getTipoIncidentes } from '@/redux/actions/incidenteActions';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { showSnackbar } from '@/redux/actions/visualsAction';

const DeleteTipoIncidenteModal = ({ open, handleClose, tipoIncidente }) => {
    const dispatch = useDispatch();

    const handleDelete = async () => {
        const { setDeleteTipoIncidenteSuccess } = await dispatch(deleteTipoIncidente(tipoIncidente.id));
        if (setDeleteTipoIncidenteSuccess) {
            dispatch(showSnackbar("Tipo de incidente eliminado satisfactoriamente", "success"));
            dispatch(getTipoIncidentes());
            handleClose();
        } else {
            dispatch(showSnackbar("No se pudo eliminar el tipo de incidente", "error"));
        }
    };

    return (
        <div className='delete-tipo-incidente'>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Eliminar Tipo de Incidente</DialogTitle>
                <DialogContent>
                    <DialogContentText>¿Está seguro de que desea eliminar el tipo de incidente {tipoIncidente.name}?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDelete}>Eliminar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DeleteTipoIncidenteModal;
