'use client'
import './Tickets.scss'
import React, { useEffect, useState } from 'react';

import { Button, Breadcrumbs, Typography, Link, Card, TextField, FormControl, InputLabel, Select, MenuItem, CardContent, } from "@mui/material"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTicket, getTableTickets, searchTicketByInfo, searchTicketByStatus, updateTicketStatus } from '@/redux/actions/ticketAction';
import { selectTickets } from '@/redux/reducers/ticketReducer';
import { selectIsAdmin } from '@/redux/reducers/authReducer';

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const tickets = useSelector(selectTickets) 
  const isAdmin = useSelector(selectIsAdmin) 

  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState("")

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
    
    dispatch(searchTicketByInfo(e.target.value));
  }

  const handleSearchByStatus = (e) => {
    setFilterStatus(e.target.value)
    dispatch(searchTicketByStatus(e.target.value));
  }

  useEffect(() => {
      dispatch(getTableTickets());
  }, [dispatch]);

  const handleViewTicket = async (ticketId, status) => {
    console.log("status",status)

    if (status === "0") {
      await dispatch(updateTicketStatus(ticketId, 1))
    }

    router.push(`/view-ticket/?ticketId=${ticketId}`)
  }

  const handleDeleteTicket = async (ticketId) => {
    const { ticketDeletedSuccessfully } = await dispatch(deleteTicket(ticketId))

    if (ticketDeletedSuccessfully) dispatch(getTableTickets())
  }

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
  }
  

  console.log("tickets",tickets)

  return(
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
              label="Asunto, usuario..." 
            />    
            <FormControl className='tickets__content__searcher__top__select'>
              <InputLabel id="select-label">Estado</InputLabel>
              <Select 
                labelId="select-label"
                id="select"
                label="Estado"
                onChange={handleSearchByStatus}
              >
                <MenuItem value={1}>Activo</MenuItem>
                <MenuItem value={0}>Inactivo</MenuItem>
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
                    <TableCell className='tickets__content__info-section__table__headers'>Status</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>prioridad</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Fecha de Creación</TableCell>
                    <TableCell className='tickets__content__info-section__table__headers'>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map(ticket => ticket.isDeleted === "0" && (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.asunto}</TableCell>
                      <TableCell>{ticket.descripcion}</TableCell>
                      <TableCell>{ticket.problema.name}</TableCell>
                      <TableCell>{ticket.user.email}</TableCell>
                      <TableCell>
                        {ticket.status === '0' ? "Nuevo" : "En espera" }</TableCell>
                      <TableCell>
                        <span style={getPriorityStyle(ticket.problema.prioridad.name)}>
                          {ticket.problema.prioridad.name}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Tooltip title="Ver Detalles">
                          <IconButton onClick={() => handleViewTicket(ticket.id, ticket.status)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Ticket">
                          <IconButton onClick={() => handleDeleteTicket(ticket.id)}>
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
    </div>
  );
};

export default Tickets;
