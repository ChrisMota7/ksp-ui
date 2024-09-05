'use client';
import './Clients.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumbs, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CreateCompanyModal from '@/components/CreateCompanyModal/CreateCompanyModal';
import EditCompanyModal from '@/components/EditCompanyModal/EditCompanyModal';
import DeleteCompanyModal from '@/components/DeleteCompanyModal/DeleteCompanyModal';
import { getEmpresasTable, deleteEmpresa } from '@/redux/actions/empresaAction';
import { selectEmpresas } from '@/redux/reducers/empresaReducer';
import { showSnackbar } from '@/redux/actions/visualsAction';

const Clients = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const empresas = useSelector(selectEmpresas) || [];  // Asegúrate de que empresas siempre tenga un valor por defecto
    
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
    const [selectedEmpresa, setSelectedEmpresa] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        dispatch(getEmpresasTable()).then(() => setLoading(false)); // Actualizar estado de carga
    }, [dispatch]);

    useEffect(() => {
        console.log("Tabla Empresas: ", empresas); // Verifica que los datos estén siendo recibidos correctamente
    }, [empresas]);

    const handleOpenCreate = () => setOpenCreate(true);
    const handleCloseCreate = () => setOpenCreate(false);

    const handleOpenEdit = (empresa) => {
        setSelectedEmpresa(empresa);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDeleteConfirmation = (empresa) => {
        setSelectedEmpresa(empresa);
        setOpenDeleteConfirmation(true);
    };
    const handleCloseDeleteConfirmation = () => setOpenDeleteConfirmation(false);

    const handleDeleteEmpresa = async () => {
        const { setDeleteEmpresaSuccess } = await dispatch(deleteEmpresa(selectedEmpresa.id));
        if (setDeleteEmpresaSuccess) {
            dispatch(showSnackbar("Cliente eliminado satisfactoriamente", "success"));
            dispatch(getEmpresasTable());  // Refresca la lista de empresas
            handleCloseDeleteConfirmation();
        } else {
            dispatch(showSnackbar("No se pudo eliminar el cliente", "error"));
        }
    };

    if (loading) {
        return <div>Cargando...</div>; // Mostrar un indicador de carga mientras se obtienen los datos
    }

    return (
        <div className='clients'>
            <div className='clients__header__title'>
                <h1>Clientes</h1>
            </div>

            <div className='clients__header__nav'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="text.primary">Helpdesk</Typography>
                    <Typography color="text.primary">Clientes</Typography>
                </Breadcrumbs>
            </div>
            <div className='clients__info'>
                <div className='clients__info__buttons'>
                    <Button variant="contained" className="problem-button" onClick={handleOpenCreate}>Nuevo Cliente</Button>
                </div>
                <div>
                    <Paper>
                        <Table>
                            <TableHead className='clients__info__table'>
                            <TableRow>
                                <TableCell className='clients__info__table__headers'>ID</TableCell>
                                <TableCell className='clients__info__table__headers'>Nombre</TableCell>
                                <TableCell className='clients__info__table__headers'>Total de empleados</TableCell>
                                <TableCell className='clients__info__table__headers'>Acciones</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {empresas.map(empresa => (
                                empresa.isDeleted === "0" &&
                                (
                                <TableRow key={empresa.id}>
                                <TableCell className='clients__info__table__content'>{empresa.id}</TableCell>
                                <TableCell className='clients__info__table__content'>{empresa.nombre}</TableCell>
                                <TableCell className='clients__info__table__content'>{empresa.nombre}</TableCell>
                                <TableCell className='clients__info__table__content'>
                                    <div className="action-icons">
                                    <Tooltip title="Editar Cliente" placement="top">
                                        <IconButton onClick={() => handleOpenEdit(empresa)}>
                                        <EditNoteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar Cliente" placement="top">
                                        <IconButton onClick={() => handleOpenDeleteConfirmation(empresa)}>
                                        <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    </div>
                                </TableCell>
                                </TableRow>
                                )
                            ))}    
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
            <Dialog
                open={openDeleteConfirmation}
                onClose={handleCloseDeleteConfirmation}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    ¿Desea eliminar este cliente?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Al confirmar, se eliminará el cliente {selectedEmpresa && selectedEmpresa.nombre}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteEmpresa}>Eliminar</Button>
                    <Button onClick={handleCloseDeleteConfirmation} autoFocus>Cancelar</Button>
                </DialogActions>
            </Dialog>
            <CreateCompanyModal open={openCreate} handleClose={handleCloseCreate} />
            {selectedEmpresa && (
                <EditCompanyModal open={openEdit} handleClose={handleCloseEdit} empresa={selectedEmpresa} />
            )}
        </div>
    );
};

export default Clients;
