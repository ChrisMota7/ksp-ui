'use client'
import './Categories.scss'
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProblems } from '@/redux/actions/categoryActions';
import { selectCategories } from '@/redux/reducers/categoryReducer';
import { Card, CardContent, Breadcrumbs, Link, Typography, Button } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';

const Categories = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);
    
    return(
        <div className='header'>
        <div className='header__title'>
          <h1>Categorías</h1>
        </div>
        <div className='header__nav'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" >
              HelpDesk
            </Link>
            <Link underline="hover" color="inherit">
              Tickets
            </Link>
            <Typography color="text.primary">Solicitudes</Typography>
          </Breadcrumbs>
        </div>
        <div className='content'>
          <Card>
            <div className='content__divisor'>
            <CardContent className='content__table'>
              <div className='content__button'>
                <Button variant="contained" onClick={() => router.push('/new-category')}>Nueva categoría</Button>
              </div>
              <div>
                <Paper>
                    <Table>
                        <TableHead className='table'>
                            <TableRow>
                                <TableCell className='table__letra'>ID</TableCell>
                                <TableCell className='table__letra'>Nombre</TableCell>
                                <TableCell className='table__letra'>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories.map(category => (
                                <TableRow key={category.id}>
                                    <TableCell>{category.id}</TableCell>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Ver Detalles">
                                            <IconButton onClick={() => router.push(`/tickets/${ticket.id}`)}>
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
    )
}

export default Categories
