'use client'
import './Categories.scss'
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getProblems } from '@/redux/actions/categoryActions';
import { selectCategories } from '@/redux/reducers/categoryReducer';
import { Breadcrumbs, Link, Typography, Button } from '@mui/material';
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
    }
    
    return(
      <div className='categories'>
        <div className='categories__header__title'>
          <h1>Categorías</h1>
        </div>

        <div className='categories__header__nav'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" >
              HelpDesk
            </Link>
            <Typography color="text.primary">Categorías</Typography>
          </Breadcrumbs>
        </div>

        <div className='categories__info'>
          <div className='categories__info__new-problem'>
            <Button variant="contained" onClick={() => router.push('/create-problems')}>Nuevo Problema</Button>
          </div>
          <div className='categories__info__new-category'>
            <Button variant="contained" onClick={() => router.push('/create-categories')}>Nueva Categoría</Button>
          </div>

          <div>
            <Paper>
                <Table>
                    <TableHead className='categories__info__table'>
                        <TableRow>
                            <TableCell className='categories__info__table__headers'>ID</TableCell>
                            <TableCell className='categories__info__table__headers'>Nombre</TableCell>
                            <TableCell className='categories__info__table__headers'>Prioridad</TableCell>
                            <TableCell className='categories__info__table__headers'>Tickets</TableCell>
                            <TableCell className='categories__info__table__headers'>Fecha de vencimiento por defecto</TableCell>
                            <TableCell className='categories__info__table__headers'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map(category => (
                            <TableRow key={category.id}>
                                <TableCell>{category.id}</TableCell>
                                <TableCell>{category.name}</TableCell>
                                <TableCell>
                                  <span style={getPriorityStyle(category.prioridad.name)}>
                                    {category.prioridad.name}
                                  </span>
                                </TableCell>
                                <TableCell>S/A</TableCell>
                                <TableCell>S/A</TableCell>
                                <TableCell>
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
    )
}

export default Categories
