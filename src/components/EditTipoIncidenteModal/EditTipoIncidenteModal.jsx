import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTipoIncidente, getTipoIncidentes } from '@/redux/actions/incidenteActions';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const EditTipoIncidenteModal = ({ open, handleClose, tipoIncidente }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [prioridad, setPrioridad] = useState('');

    useEffect(() => {
        if (tipoIncidente) {
            setName(tipoIncidente.name);
            setPrioridad(tipoIncidente.prioridad.id);
        }
    }, [tipoIncidente]);

    const handleUpdate = async () => {
        const result = await dispatch(updateTipoIncidente(tipoIncidente.id, { name, prioridad }));
        if (result.setUpdateTipoIncidenteSuccess) {
            dispatch(showSnackbar("Tipo de incidente actualizado exitosamente", "success"));
            dispatch(getTipoIncidentes());
            handleClose();
        } else {
            dispatch(showSnackbar("Error al actualizar el tipo de incidente", "error"));
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Tipo de Incidente</DialogTitle>
            <DialogContent>
                <TextField 
                    required 
                    label="Nombre del Tipo de Incidente" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    fullWidth
                    margin="dense"
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="select-prioridad-label">Prioridad</InputLabel>
                    <Select
                        labelId="select-prioridad-label"
                        value={prioridad}
                        onChange={(e) => setPrioridad(e.target.value)}
                    >
                        <MenuItem value={1}>Bajo</MenuItem>
                        <MenuItem value={2}>Medio</MenuItem>
                        <MenuItem value={3}>Crítico</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleUpdate} disabled={!name || !prioridad}>Actualizar</Button>
                <Button onClick={handleClose}>Cancelar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTipoIncidenteModal;
