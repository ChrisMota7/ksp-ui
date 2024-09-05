'use client'
import './Tickets.scss'
import React, { useEffect, useState } from 'react';
import { Button, Breadcrumbs, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Paper, IconButton, Tooltip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, getTableTickets, searchTicketByInfo, searchTicketByStatus, searchTicketByPriority, filterTicketsByDate } from '@/redux/actions/ticketAction';
import { selectTickets } from '@/redux/reducers/ticketReducer';
import { selectIsAdmin } from '@/redux/reducers/authReducer';
import { showSnackbar } from '@/redux/actions/visualsAction';

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const tickets = useSelector(selectTickets);
  const isAdmin = useSelector(selectIsAdmin);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDate, setFilterDate] = useState("");
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

  const handleSearchByPriority = (e) => {
    setFilterPriority(e.target.value);
    dispatch(searchTicketByPriority(e.target.value));
  };

  const handleFilterByDate = (e) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setFilterDate(e.target.value);
    dispatch(filterTicketsByDate(date));
  };

  const handleClearFilters = () => {
    setSearch("");
    setFilterStatus("");
    setFilterPriority("");
    setFilterDate("");
    dispatch(getTableTickets());
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
    setDeleteReason("");
  };

  const handleDeleteTicket = async () => {
    if (ticketToDelete !== null) {
      const { ticketDeletedSuccessfully } = await dispatch(deleteTicket(ticketToDelete, deleteReason));
      if (ticketDeletedSuccessfully) {
        dispatch(showSnackbar("Ticket eliminado correctamente", "success"));
        dispatch(getTableTickets());
      } else {
        dispatch(showSnackbar("Error al eliminar el ticket", "error"));
      }
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
          padding: '4px 30px', 
          borderRadius: '5px' 
        };
      case 'Medio':
        return { 
          color: 'white', 
          backgroundColor: '#E66E00', 
          textDecoration: 'solid', 
          padding: '3px 25px', 
          borderRadius: '5px' 
        };
      case 'Crítico':
        return { 
          color: 'white', 
          backgroundColor: '#E63B2C', 
          textDecoration: 'solid', 
          padding: '3px 22px', 
          borderRadius: '5px' 
        };
      default:
        return { 
          color: 'white', 
          backgroundColor: 'grey', 
          textDecoration: 'none',
          padding: '3px 22px', 
          borderRadius: '5px' 
        };
    }
  };

  const getStatusClassName = (status) => {
    switch (status) {
        case 'Nuevo':
            return 'status status-nuevo';
        case 'En espera':
            return 'status status-en-espera';
        case 'Respondido':
            return 'status status-respondido';
        case 'Resuelto':
            return 'status status-resuelto';
        default:
            return 'status status-default';
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
        <div className='tickets__content__info-section__button'>
          <Button variant="contained" onClick={() => router.push(`/create-ticket/`)}>Nuevo Ticket</Button>
        </div>
        <div className='tickets__content__searcher'>
          <div className='tickets__content__searcher__top'>
            <TextField  
              className='tickets__content__searcher__top__input' 
              id="outlined-basic" 
              value={search}
              onChange={handleSearch}
              label="ID, asunto, usuario..." 
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start" color="disabled">
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
            <FormControl className='tickets__content__searcher__top__select'>
              <InputLabel id="priority-select-label">Prioridad</InputLabel>
              <Select 
                labelId="priority-select-label" 
                id="priority-select"
                label="Prioridad"
                value={filterPriority}
                onChange={handleSearchByPriority}
              >
                <MenuItem value="Bajo">Bajo</MenuItem>
                <MenuItem value="Medio">Medio</MenuItem>
                <MenuItem value="Crítico">Crítico</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Filtrar por fecha"
              type="date"
              value={filterDate}
              onChange={handleFilterByDate}
              InputLabelProps={{
                shrink: true,
              }}
              className='tickets__content__searcher__top__date'
            />
            <Button variant="outlined" onClick={handleClearFilters}>Limpiar</Button>
          </div>
        </div>
        <div className='tickets__content__info-section'>
          <div>
            <Paper>
              <Table>
                <TableHead className='tickets__content__info-section__table'>
                  <TableRow>
                    <TableCell className='tickets__content__info-section__table__headers'>ID</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Asunto</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Problema</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Categoría</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Usuario</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Estado</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Prioridad</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Fecha de Creación</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell className='tickets__content__info-section__table__content'>{ticket.id}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>{ticket.asunto}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>{ticket.problema.name}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>{ticket.problema.categoria.name}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>{ticket.user.email}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>
                          <span className={getStatusClassName(ticket.status)}>
                              {ticket.status}
                          </span>
                      </TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>
                        <span style={getPriorityStyle(ticket.problema.prioridad.name)}>
                          {ticket.problema.prioridad.name}
                        </span>
                      </TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell className='tickets__content__info-section__table__content'>
                        <div className="action-icons">
                          <Tooltip title="Ver Detalles" placement="top">
                            <IconButton onClick={() => handleViewTicket(ticket.id)}>
                              <VisibilityIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar Ticket" placement="top">
                            <IconButton onClick={() => handleOpenConfirmDialog(ticket.id)}>
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
          <Button className='tickets__dialog' onClick={handleDeleteTicket} color="primary" autoFocus>
            Eliminar
          </Button>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Tickets;
