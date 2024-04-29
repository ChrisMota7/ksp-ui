'use client'
import './Tickets.scss'
import React, { useEffect, useState } from 'react';

import { Button, Breadcrumbs, Typography, Link, Card, TextField, FormControl, InputLabel, Select, MenuItem, CardContent, } from "@mui/material"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTableTickets, searchTicketByInfo } from '@/redux/actions/ticketAction';
import { selectTickets } from '@/redux/reducers/ticketReducer';

const Tickets = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [search, setSearch] = useState("")
  const tickets = useSelector(selectTickets) 
  // const tickets = [
  //   {
  //     asunto:  "asunto 1",
  //     created_at: "2024-04-28T05:30:42.136946Z",
  //     descripcion: "aaaaa",
  //     id: 1,
  //     prioridad: null,
  //     problema: {id: 1, name: 'Administrar equipos', isDeleted: '0', categoria: 1},
  //     status: "0",
  //     user: {
  //       id: 2, 
  //       firstName: 'Christian', 
  //       lastName: 'López', 
  //       email: 'chris@ksp.com.mx', 
  //       isDeleted: '0', 
  //       createdAt: "2024-04-28T05:28:59.163412Z",
  //       isAdmin: "0"
  //     }
  //   },
  //   {
  //     asunto: "Prueba 1 crear ticket",
  //     created_at: "2024-04-28T05:30:51.042209Z",
  //     descripcion: "desc 1",
  //     id: 2,
  //     prioridad: null,
  //     problema: {id: 2, name: 'Administrar cuentas', isDeleted: '0', categoria: 2},
  //     status: "0",
  //     user: {
  //       id: 2, 
  //       firstName: 'prueba', 
  //       lastName: 'López', 
  //       email: 'isra', 
  //       isDeleted: '0', 
  //       createdAt: "2024-04-28T05:28:59.163412Z",
  //       isAdmin: "0"
  //     }
  //   }
  // ]
  const [Status, setStatus] = useState("")

  const handleSearch = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
    
    dispatch(searchTicketByInfo(e.target.value));
  }

  useEffect(() => {
      dispatch(getTableTickets());
  }, [dispatch]);

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
                onChange={event => setStatus(event.target.value)}
              >
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={2}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='tickets__content__info-section'>
          <div className='tickets__content__info-section__button'>
            <Button variant="contained" onClick={() => router.push(`/create-ticket/`)}>Nuevo Ticket</Button>
          </div>
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
                  {tickets.map(ticket => (
                    <TableRow key={ticket.id}>
                      <TableCell>{ticket.id}</TableCell>
                      <TableCell>{ticket.asunto}</TableCell>
                      <TableCell>{ticket.descripcion}</TableCell>
                      <TableCell>{ticket.problema.name}</TableCell>
                      <TableCell>{ticket.user.email}</TableCell>
                      <TableCell>
                        {ticket.status === 0 ? "Inactivo" : "Activo" }</TableCell>
                      <TableCell>
                        {ticket.prioridad ? ticket.prioridad.name : "S/A"}
                      </TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Tooltip title="Ver Detalles">
                          <IconButton onClick={() => router.push(`/tickets/view-ticket/`)}>
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar Ticket">
                          <IconButton onClick={() => deleteTicket(ticket.id)}>
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
