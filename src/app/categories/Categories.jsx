'use client'
import './Categories.scss'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, deleteProblem, getCategories, getProblems } from '@/redux/actions/categoryActions';
import { selectCategories } from '@/redux/reducers/categoryReducer';
import { Breadcrumbs, Link, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Modal, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { showSnackbar } from '@/redux/actions/visualsAction';
import EditProblemModal from '@/components/EditProblemModal/EditProblemModal';

const Categories = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    const [seletedCategoryName, setSelectedCategoryName] = useState("")
    const [seletedCategoryId, setSelectedCategoryId] = useState("")
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    const [openEditCategory, setOpenEditCategory] = useState(false)
  
    useEffect(() => {
        dispatch(getProblems());
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
      const { setDeleteCategerySuccess } = await dispatch(deleteProblem(seletedCategoryId))

      if (setDeleteCategerySuccess) {
        dispatch(showSnackbar("Categoría eliminada satisfactoriamente", "success"))
        dispatch(getProblems());
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
            <Typography color="text.primary">Tickets</Typography>
            <Typography color="text.primary">Categorías</Typography>
          </Breadcrumbs>
        </div>

        <div className='categories__info'>
          <div className='categories__info__buttons'>
            <Button variant="contained" className="problem-button" onClick={() => router.push('/create-problems')}>Nuevo Problema</Button>
            <Button variant="contained" className="category-button" onClick={() => router.push('/create-categories')}>Nueva Categoría</Button>
          </div>

          <div>
            <Paper>
                <Table>
                    <TableHead className='categories__info__table'>
                        <TableRow>
                            <TableCell className='categories__info__table__headers'>ID</TableCell>
                            <TableCell className='categories__info__table__headers'>Problema</TableCell>
                            <TableCell className='categories__info__table__headers'>Categoría</TableCell>
                            <TableCell className='categories__info__table__headers'>Prioridad</TableCell>
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
                                <TableCell>{category.categoria.name}</TableCell>
                                <TableCell>
                                  <span style={getPriorityStyle(category.prioridad.name)}>
                                    {category.prioridad.name}
                                  </span>
                                </TableCell>
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
            <Button className='categories__dialog' onClick={handleDeleteCategory}>
                  Eliminar
              </Button>
              <Button onClick={handleCloseDeleteConfirmation} autoFocus>Cancelar</Button>
            </DialogActions>
        </Dialog>

        <EditProblemModal 
          openEditCategory={openEditCategory} 
          handleCloseEditCategory={handleCloseEditCategory}
          categoryName={seletedCategoryName}
          categoryId={seletedCategoryId}
        />
      </div>
    )
}

export default Categories;
