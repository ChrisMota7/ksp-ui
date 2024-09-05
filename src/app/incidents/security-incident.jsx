'use client'
import './security-incident.scss'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Breadcrumbs, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Tooltip, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { getIncidentes, deleteIncidente } from '@/redux/actions/incidenteActions';
import { selectIncidentes } from '@/redux/reducers/incidenteReducer';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { selectIsAdmin } from '@/redux/reducers/authReducer';

const SecurityIncident = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const incidentes = useSelector(selectIncidentes);
  const isAdmin = useSelector(selectIsAdmin);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  useEffect(() => {
    dispatch(getIncidentes());
  }, [dispatch]);

  const handleViewIncident = (incidentId) => {
    router.push(`/view-incident/?incidentId=${incidentId}`);
  };

  const handleDeleteIncident = async () => {
    const { incidenteDeletedSuccessfully } = await dispatch(deleteIncidente(selectedIncidentId));
    if (incidenteDeletedSuccessfully) {
      dispatch(showSnackbar("Incidente eliminado correctamente", "success"));
      dispatch(getIncidentes());
      setOpenDialog(false);
    } else {
      dispatch(showSnackbar("Error al eliminar el incidente", "error"));
    }
  };

  const openDeleteDialog = (incidentId) => {
    setSelectedIncidentId(incidentId);
    setOpenDialog(true);
  };

  const closeDeleteDialog = () => {
    setOpenDialog(false);
    setSelectedIncidentId(null);
  };

  const filteredIncidentes = incidentes.filter(incidente => {
    if (isAdmin === "true") {
      return incidente.isDeleted === "0";
    } else {
      const userId = localStorage.getItem("userid");
      return incidente.user.id == userId && incidente.isDeleted === "0";
    }
  });

  return (
    <div className='incident'>
      <div className='incident__header__title'>
        <h1>Incidentes de seguridad</h1>
      </div>
      <div className='incident__header__nav'>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">HelpDesk</Typography>
          <Typography color="text.primary">Incidentes de seguridad</Typography>
        </Breadcrumbs>
      </div>
      <div className='incident__content'>
        <div className='incident__content__info-section__button'>
          {isAdmin === "true" && (
              <Button variant="contained" className='incident__content__info-section__button__new' onClick={() => router.push(`/new-incident/`)}>Tipo incidente</Button>
            )}
          <Button variant="contained" className='incident__content__info-section__button__create' onClick={() => router.push(`/create-incident/`)}>Nuevo Incidente</Button>
        </div>
        <div className='incident__content__info-section'>
          <Paper>
            <Table>
              <TableHead className='incident__content__info-section__table'>
                <TableRow>
                  <TableCell className='incident__content__info-section__table__headers'>ID</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Usuario</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Empresa</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Tipo</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Teléfono</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Puesto</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Fecha de Creación</TableCell>
                  <TableCell className='incident__content__info-section__table__headers'>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredIncidentes.map(incidente => (
                  <TableRow key={incidente.id}>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.id}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.user.email}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.user.empresa.nombre}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.tipoIncidente_detail.name}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.user.telefono}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{incidente.puesto}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>{new Date(incidente.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className='incident__content__info-section__table__content'>
                      <div className="action-icons">
                        <Tooltip title="Ver Detalles" placement="top">
                          <IconButton onClick={() => handleViewIncident(incidente.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Incidente" placement="top">
                          <IconButton onClick={() => openDeleteDialog(incidente.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
      <Dialog open={openDialog} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar este incidente? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteIncident}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SecurityIncident;
