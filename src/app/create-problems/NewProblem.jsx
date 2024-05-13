'use client'
import './NewProblem.scss'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createProblem, getCategoriesAll } from '@/redux/actions/categoryActions';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Breadcrumbs, Link, Typography } from '@mui/material';
import { selectCategoriesAll } from '@/redux/reducers/categoryReducer';

const NewProblem = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const categories = useSelector(selectCategoriesAll);

    const [name, setName] = useState("");
    const [categoriaid, setCategoriaid] = useState("");
    const [prioridadid, setPrioridad] = useState("");

    const submitCreateProblem = (e) => {
        e.preventDefault();

        dispatch(createProblem(name, categoriaid, prioridadid))
    }

    useEffect(() => {
        dispatch(getCategoriesAll());
    }, [dispatch]);

    return (
        <div className='create-problem'>
            <div className='create-problem__header'>
                <div className='create-problem__header__title'>
                    <h1>Nuevo Problema</h1>
                </div>

                <div className='create-problem__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/categories/')}>
                            Categorias
                        </Link>
                        <Typography color="text.primary">Nueva</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <form className='create-problem__content' onSubmit={submitCreateProblem}>
                <div className='create-problem__content__top'> 
                    <TextField
                        className='create-problem__content__top__input'
                        label="Nombre del Problema"
                        value={name} 
                        name='name' 
                        type='text'
                        onChange={event => setName(event.target.value)}
                        required
                    />
                    <FormControl className='create-problem__content__top__select'>
                        <InputLabel id="select-label">Categoría</InputLabel>
                        <Select 
                            value={categoriaid}
                            labelId="select-label"
                            id="select"
                            label="Categoría"
                            onChange={event => setCategoriaid(event.target.value)}
                        >
                            {categories.map((categoria) => (
                                <MenuItem key={categoria.id} value={categoria.id}>
                                    {categoria.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className='create-problem__content__top__select'>
                        <InputLabel id="select-label">Prioridad</InputLabel>
                        <Select 
                            value={prioridadid} name='categoria'
                            labelId="select-label"
                            id="select"
                            label="categoria"
                            onChange={event => setPrioridad(event.target.value)}
                        >
                            <MenuItem value={1}>Bajo</MenuItem>
                            <MenuItem value={2}>Medio</MenuItem>
                            <MenuItem value={3}>Crítico</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='create-problem__button-container'>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            onClick={() => router.push(`/categories/`)}>
                                Crear Categoría
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewProblem;