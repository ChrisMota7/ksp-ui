'use client'
import './Tickets.scss'
import React, { useEffect } from 'react';

import { Button, Breadcrumbs, Typography, Link, Card, TextField, FormControl, InputLabel, Select, MenuItem, CardContent, } from "@mui/material"
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getTableTickets } from '@/redux/actions/ticketAction';

const Tickets = () => {
    const dispatch = useDispatch();

    const tickets = useSelector(state => state.ticketReducer.ticketsTable);
    const router = useRouter()

    useEffect(() => {
        dispatch(getTableTickets());
    }, [dispatch]);


    return(
        <div className='header'>
      <div className='header__title'>
        <h1>Tickets</h1>
      </div>
      <div className='header__nav'>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography color="text.primary">HelpDesk</Typography>
          <Typography color="text.primary">Tickets</Typography>
        </Breadcrumbs>
      </div>
      <div className='content'>
        <Card>
        <div className='content__division'> 
            <div className='content__label'>
                <TextField  className='content__label' id="outlined-basic" label="ID, Nombre, Correo, Fecha" />    
                <Button  variant="contained">Buscar</Button>
            </div>
            <div className='content__label__select'>
              <FormControl className='content__label__select'>
                <InputLabel id="select-label">Estado</InputLabel>
                <Select 
                  labelId="select-label"
                  id="select"
                  label="Estado"
                >
                <MenuItem >Activo</MenuItem>
                <MenuItem >Inactivo</MenuItem>
                </Select>
              </FormControl>
            </div>
        </div>
        </Card>
            <br></br>
        <Card>
          <div className='content__divisor'>
          <CardContent className='content__table'>
            <div className='content__button'>
              <Button variant="contained" onClick={() => router.push(`/create-ticket/`)}>Nuevo Ticket</Button>
            </div>
            <div>
                <Paper>
                  <Table>
                      <TableHead className='table'>
                          <TableRow>
                              <TableCell className='table__letra'>ID</TableCell>
                              <TableCell className='table__letra'>Asunto</TableCell>
                              <TableCell className='table__letra'>Descripción</TableCell>
                              <TableCell className='table__letra'>Problema</TableCell>
                              <TableCell className='table__letra'>Usuario</TableCell>
                              {/* <TableCell>Prioridad</TableCell> */}
                              <TableCell className='table__letra'>Fecha de Creación</TableCell>
                              <TableCell className='table__letra'>Acciones</TableCell>
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
                                  {/* <TableCell>{ticket.prioridad.name}</TableCell> */}
                                  <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Ver Detalles">
                                            <IconButton onClick={() => router.push(`/tickets/ViewTicket/${ticket.id}`)}>
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
          </CardContent>
          </div>
        </Card>
      </div>
    </div>
    );
};

export default Tickets;