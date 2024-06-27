'use client'
import './Tickets.scss'
import React, { useEffect, useState } from 'react';

import { Button, Breadcrumbs, Typography, Link, TextField, FormControl, InputLabel, Select, MenuItem, Paper, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, getTableTickets, searchTicketByInfo, searchTicketByStatus } from '@/redux/actions/ticketAction';
import { selectTickets } from '@/redux/reducers/ticketReducer';
import { selectIsAdmin } from '@/redux/reducers/authReducer';

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const tickets = useSelector(selectTickets);
  const isAdmin = useSelector(selectIsAdmin);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [deleteReason, setDeleteReason] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchTicketByInfo(e.target.value));
  };

  const handleSearchByStatus = (e) => {
    setFilterStatus(e.target.value);
    dispatch(searchTicketByStatus(e.target.value));
  };

  useEffect(() => {
    dispatch(getTableTickets());
  }, [dispatch]);

  const handleViewTicket = (ticketId) => {
    router.push(`/view-ticket/?ticketId=${ticketId}`);
  };

  const handleOpenConfirmDialog = (ticketId) => {
    setTicketToDelete(ticketId);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setTicketToDelete(null);
    setDeleteReason(""); // Reset the reason when closing the dialog
  };

  const handleDeleteTicket = async () => {
    if (ticketToDelete !== null) {
      const { ticketDeletedSuccessfully } = await dispatch(deleteTicket(ticketToDelete, deleteReason));
      if (ticketDeletedSuccessfully) dispatch(getTableTickets());
      handleCloseConfirmDialog();
    }
  };

  const getPriorityStyle = (priorityName) => {
    switch (priorityName) {
      case 'Bajo':
        return { 
          color: 'white', 
          backgroundColor: '#00913f', 
          textDecoration: 'solid', 
          padding: '4px 18px', 
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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Nuevo':
        return { color: 'red', fontWeight: 'bold' };
      case 'En espera':
        return { color: 'orange', fontWeight: 'bold' };
      case 'Respondido':
        return { color: 'blue', fontWeight: 'bold' };
      case 'Resuelto':
        return { color: 'green', fontWeight: 'bold' };
      default:
        return { color: 'black', fontWeight: 'bold' };
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filterStatus === 'Resuelto') {
      return ticket.status === 'Resuelto';
    }
    return ticket.status !== 'Resuelto' && ticket.isDeleted === "0";
  });

  return (
    <div className='tickets'>
      <div className='tickets__header__title'>
        <h1>Tickets</h1>
      </div>
      <div className='tickets__header__nav'>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">HelpDesk</Typography>
          <Typography color="text.primary">Tickets</Typography>
        </Breadcrumbs>
      </div>
      <div className='tickets__content'>
        <div className='tickets__content__searcher'>
          <div className='tickets__content__searcher__top'>
            <TextField  
              className='tickets__content__searcher__top__input' 
              id="outlined-basic" 
              value={search}
              onChange={handleSearch}
              label="ID, asunto, usuario, prioridad..." 
            />    
            <FormControl className='tickets__content__searcher__top__select'>
              <InputLabel id="select-label">Estado</InputLabel>
              <Select 
                labelId="select-label"
                id="select"
                label="Estado"
                value={filterStatus}
                onChange={handleSearchByStatus}
              >
                <MenuItem value="Nuevo">Nuevo</MenuItem>
                <MenuItem value="En espera">En espera</MenuItem>
                <MenuItem value="Respondido">Respondido</MenuItem>
                <MenuItem value="Resuelto">Resuelto</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='tickets__content__info-section'>
          {isAdmin === "false" && (
            <div className='tickets__content__info-section__button'>
              <Button variant="contained" onClick={() => router.push(`/create-ticket/`)}>Nuevo Ticket</Button>
            </div>
          )}
          <div>
            <Paper>
              <Table>
                <TableHead className='tickets__content__info-section__table'>
                  <TableRow>
                    <TableCell className='tickets__content__info-section__table__headers'>ID</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Asunto</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Descripción</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Problema</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Usuario</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Estatus</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Prioridad</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Fecha de Creación</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.asunto}</TableCell>
                      <TableCell>{ticket.descripcion}</TableCell>
                      <TableCell>{ticket.problema.name}</TableCell>
                      <TableCell>{ticket.user.email}</TableCell>
                      <TableCell style={getStatusStyle(ticket.status)}>{ticket.status}</TableCell>
                      <TableCell>
                        <span style={getPriorityStyle(ticket.problema.prioridad.name)}>
                          {ticket.problema.prioridad.name}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Tooltip title="Ver Detalles">
                          <IconButton onClick={() => handleViewTicket(ticket.id)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Ticket">
                          <IconButton onClick={() => handleOpenConfirmDialog(ticket.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}    
                </TableBody>
              </Table>
            </Paper>
          </div>  
        </div>
      </div>

      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Eliminación"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres eliminar este ticket?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="reason"
            label="Razón de eliminación"
            type="text"
            fullWidth
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTicket} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tickets;
