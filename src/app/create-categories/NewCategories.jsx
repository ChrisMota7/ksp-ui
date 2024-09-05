'use client'
import './NewCategories.scss'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createCategorie, updateCategories, deleteCategories, getCategoriesAll } from '@/redux/actions/categoryActions';
import { selectCategories, selectCategoriesAll } from '@/redux/reducers/categoryReducer';
import { Breadcrumbs, Link, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditCategoryModal from '@/components/EditCategoryModal/EditCategoryModal';
import { showSnackbar } from '@/redux/actions/visualsAction';

const NewCategories = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const categories = useSelector(selectCategoriesAll);

    const [name, setName] = useState("");

    const submitCreateCategorie = async (e) => {
        e.preventDefault();
        const { categorieCreatedSuccessfully } = await dispatch(createCategorie(name));
        if (categorieCreatedSuccessfully) {
            dispatch(getCategoriesAll());
            dispatch(showSnackbar("Categoría creada satisfactoriamente", "success"));
            setName("");
        } else {
            dispatch(showSnackbar("No se pudo crear la categoría", "error"));
        }
    }

    const [selectedCategoryName, setSelectedCategoryName] = useState("")
    const [selectedCategoryId, setSelectedCategoryId] = useState("")
    const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
    const [openEditCategory, setOpenEditCategory] = useState(false)

    useEffect(() => {
        dispatch(getCategoriesAll());
    }, [dispatch]);

    const handleDeleteCategory = async () => {
        const { setDeleteCategerySuccess } = await dispatch(deleteCategories(selectedCategoryId));
        if (setDeleteCategerySuccess) {
            dispatch(showSnackbar("Categoría eliminada satisfactoriamente", "success"));
            dispatch(getCategoriesAll());
            clearStates();
        } else {
            dispatch(showSnackbar("No se pudo eliminar la categoría", "error"));
        }
    }

    const clearStates = () => {
        setSelectedCategoryName("")
        setSelectedCategoryId("")
        setOpenDeleteConfirmation(false)
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
        setSelectedCategoryInfo(category)
        setOpenEditCategory(true)
    }

    const handleCloseEditCategory = () => {
        setOpenEditCategory(false)
    }

    return (
        <div className='create-categorie'>
            <div className='create-categorie__header'>
                <div className='create-categorie__header__title'>
                    <h1>Nueva Categoría</h1>
                </div>

                <div className='create-categorie__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/categories/')}>
                            Categorías
                        </Link>
                        <Typography color="text.primary">Nueva Categoría</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <form className='create-categorie__form' onSubmit={submitCreateCategorie}>
                <TextField
                    className='create-categorie__form__input'
                    label="Nombre de la categoría"
                    value={name} 
                    name='name' 
                    type='text'
                    onChange={event => setName(event.target.value)}
                    required
                />
                <div>
                    <Button 
                        variant="contained" 
                        className='create-categorie__form__button__cancel'
                        onClick={() => router.push(`/categories/`)}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className='create-categorie__form__button__create'
                    >
                        Crear Categoría
                    </Button>
                </div>
            </form>

            <div>
                <Paper>
                    <Table>
                        <TableHead className='create-categorie__table'>
                            <TableRow>
                                <TableCell className='categories__info__table__headers'>ID</TableCell>
                                <TableCell className='categories__info__table__headers'>Categoría</TableCell>
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
                        Al confirmar, se eliminará la categoría {selectedCategoryName}.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className='categories__dialog' onClick={handleDeleteCategory}>
                        Eliminar
                    </Button>
                    <Button onClick={handleCloseDeleteConfirmation} autoFocus>Cancelar</Button>
                </DialogActions>
            </Dialog>

            <EditCategoryModal 
                openEditCategory={openEditCategory} 
                handleCloseEditCategory={handleCloseEditCategory}
                categoryName={selectedCategoryName}
                categoryId={selectedCategoryId}
            />
        </div>
    );
};

export default NewCategories;
