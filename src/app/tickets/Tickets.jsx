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
import { selectTickets } from '@/redux/reducers/ticketReducer';

const Tickets = () => {
    const dispatch = useDispatch();

    const tickets = useSelector(selectTickets);
    
    const router = useRouter()

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
                label="ID, Nombre, Correo, Fecha" 
              />    

              <FormControl className='tickets__content__searcher__top__select'>
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
            
            <Button className='tickets__content__searcher__bottom' variant="contained">Buscar</Button>
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
                        <TableCell>{new Date(ticket.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Tooltip title="Ver Detalles">
                            <IconButton onClick={() => router.push(`/tickets/ViewTicket/`)}>
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