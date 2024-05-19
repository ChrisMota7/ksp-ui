'use client'
import './Categories.scss'
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategories, getProblems } from '@/redux/actions/categoryActions';
import { selectCategories } from '@/redux/reducers/categoryReducer';
import { Breadcrumbs, Link, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Modal, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { showSnackbar } from '@/redux/actions/visualsAction';
import EditCategoryModal from '@/components/EdtiCategoryModal/EditCategoryModal';

const Categories = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    const [seletedCategoryName, setSelectedCategoryName] = useState("")
    const [seletedCategoryId, setSelectedCategoryId] = useState("")
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    const [openEditCategory, setOpenEditCategory] = useState(false)
  
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

    const handleDeleteCategory = async () => {
      const { setDeleteCategerySuccess } = await dispatch(deleteCategory(seletedCategoryId))

      if (setDeleteCategerySuccess) {
        dispatch(showSnackbar("Categoría eliminada satisfactoriamente", "success"))
        dispatch(getCategories());
        clearStates()
      } else {
        dispatch(showSnackbar("No se pudo aliminar la categoría", "error"))
      }
    }

    const clearStates = () => {
      setSelectedCategoryName("")
      setSelectedCategoryId("")
      setOpenDeleteConfirmation("")
    }

    const handleCloseDeleteConfirmation = () => {
      setOpenDeleteConfirmation(false)
    }

    const setSelectedCategoryInfo = (category) => {
      const categoryId = category.id
      const categoryName = category.name

      setSelectedCategoryName(categoryName)
      setSelectedCategoryId(categoryId)
    }
    
    const handleOpenDeleteConfirmation = (category) => {
      setSelectedCategoryInfo(category)
      setOpenDeleteConfirmation(true)
    }

    const handleOpenEditCategory = async (category) => {
      await setSelectedCategoryInfo(category)
      setOpenEditCategory(true)
    }

    const handleCloseEditCategory = () => {
      setOpenEditCategory(false)
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
                            category.isDeleted === "0" &&
                            (
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
                                    <Tooltip title="Editar Categoría">
                                        <IconButton onClick={() => handleOpenEditCategory(category)}>
                                            <EditNoteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar Categoría">
                                        <IconButton onClick={() => handleOpenDeleteConfirmation(category)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
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
                ¿Desea eliminar esta categoría?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  Al confirmar, se eliminará la categoría {seletedCategoryName}.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDeleteConfirmation} autoFocus>Cancelar</Button>
              <Button onClick={handleDeleteCategory}>
                  Eliminar
              </Button>
            </DialogActions>
        </Dialog>

        <EditCategoryModal 
          openEditCategory={openEditCategory} 
          handleCloseEditCategory={handleCloseEditCategory}
          categoryName={seletedCategoryName}
          categoryId={seletedCategoryId}
        />
      </div>
    )
}

export default Categories
