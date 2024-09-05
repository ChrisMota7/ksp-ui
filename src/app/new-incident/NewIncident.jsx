'use client'
import './NewIncident.scss'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createTipoIncident, getTipoIncidentes } from '@/redux/actions/incidenteActions';
import { selectTipoIncidentes } from '@/redux/reducers/incidenteReducer';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Breadcrumbs, Link, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditTipoIncidenteModal from '@/components/EditTipoIncidenteModal/EditTipoIncidenteModal';
import DeleteTipoIncidenteModal from '@/components/DeleteTipoIncidenteModal/DeleteTipoIncidenteModal';

const NewIncident = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const tiposIncidentes = useSelector(selectTipoIncidentes);
    const [name, setName] = useState("");
    const [prioridadId, setPrioridadId] = useState("");
    const [selectedTipoIncidente, setSelectedTipoIncidente] = useState(null);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(getTipoIncidentes());
    }, [dispatch]);

    const submitCreateTipoIncident = async (e) => {
        e.preventDefault();

        const { tipoIncidentCreatedSuccessfully } = await dispatch(createTipoIncident(name, prioridadId));

        if (tipoIncidentCreatedSuccessfully) {
            dispatch(getTipoIncidentes());
            setName("");
            setPrioridadId("");
        }
    };

    const handleOpenEditModal = (tipoIncidente) => {
        setSelectedTipoIncidente(tipoIncidente);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedTipoIncidente(null);
    };

    const handleOpenDeleteModal = (tipoIncidente) => {
        setSelectedTipoIncidente(tipoIncidente);
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedTipoIncidente(null);
    };

    const getPriorityStyle = (priorityName) => {
        switch (priorityName) {
            case 'Bajo':
                return { 
                    color: 'white', 
                    backgroundColor: '#00913f', 
                    textDecoration: 'solid', 
                    padding: '3px 17px', 
                    borderRadius: '5px' 
                };
            case 'Medio':
                return { 
                    color: 'white', 
                    backgroundColor: '#E66E00', 
                    textDecoration: 'solid', 
                    padding: '3px 10px', 
                    borderRadius: '5px' 
                };
            case 'Crítico':
                return { 
                    color: 'white', 
                    backgroundColor: '#E63B2C', 
                    textDecoration: 'solid', 
                    padding: '3px 10px', 
                    borderRadius: '5px' 
                };
            default:
                return { 
                    color: 'white', 
                    backgroundColor: 'grey', 
                    textDecoration: 'none',
                    padding: '3px 10px', 
                    borderRadius: '5px' 
                };
        }
    };

    return (
        <div className='create-incident'>
            <div className='create-incident__header'>
                <div className='create-incident__header__title'>
                    <h1>Nuevo Tipo de Incidente</h1>
                </div>

                <div className='create-incident__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/incidents/')}>
                            Incidentes
                        </Link>
                        <Typography color="text.primary">Nuevo Tipo de Incidente</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <form className='create-incident__form' onSubmit={submitCreateTipoIncident}>
                <TextField
                    className='create-incident__form__input'
                    label="Nombre del Tipo de Incidente"
                    value={name} 
                    name='name' 
                    type='text'
                    onChange={event => setName(event.target.value)}
                    required
                />
                <FormControl className='create-incident__form__select'>
                    <InputLabel id="select-prioridad-label">Prioridad</InputLabel>
                    <Select 
                        value={prioridadId}
                        labelId="select-prioridad-label"
                        id="select-prioridad"
                        label="Prioridad"
                        onChange={event => setPrioridadId(event.target.value)}
                    >
                        <MenuItem value={1}>Bajo</MenuItem>
                        <MenuItem value={2}>Medio</MenuItem>
                        <MenuItem value={3}>Crítico</MenuItem>
                    </Select>
                </FormControl>
                <div className='create-incident__form__button'>
                    <Button 
                        variant="contained" 
                        className='create-incident__form__button__cancel'
                        onClick={() => router.push(`/incidents/`)}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className='create-incident__form__button__create'
                    >
                        Crear Tipo de Incidente
                    </Button>
                </div>
            </form>

            <div className='create-incident__table'>
                <Paper>
                    <Table>
                        <TableHead className='create-incident__table__head'>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Prioridad</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tiposIncidentes.map((tipoIncidente) => (
                                (tipoIncidente.isDeleted === "0" &&
                                <TableRow key={tipoIncidente.id}>
                                    <TableCell>{tipoIncidente.id}</TableCell>
                                    <TableCell>{tipoIncidente.name}</TableCell>
                                    <TableCell>
                                        <span style={getPriorityStyle(tipoIncidente.prioridad.name)}>
                                            {tipoIncidente.prioridad.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Editar Tipo de Incidente">
                                            <IconButton onClick={() => handleOpenEditModal(tipoIncidente)}>
                                                <EditNoteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Eliminar Tipo de Incidente">
                                            <IconButton onClick={() => handleOpenDeleteModal(tipoIncidente)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                                )
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>

            {selectedTipoIncidente && (
                <EditTipoIncidenteModal
                    open={openEditModal}
                    handleClose={handleCloseEditModal}
                    tipoIncidente={selectedTipoIncidente}
                />
            )}

            {selectedTipoIncidente && (
                <DeleteTipoIncidenteModal
                    open={openDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    tipoIncidente={selectedTipoIncidente}
                />
            )}
        </div>
    );
};

export default NewIncident;
