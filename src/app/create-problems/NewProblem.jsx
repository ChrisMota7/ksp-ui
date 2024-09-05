'use client'
import './NewProblem.scss'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createProblem, getCategoriesAll } from '@/redux/actions/categoryActions';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Breadcrumbs, Link, Typography } from '@mui/material';
import { selectCategoriesAll } from '@/redux/reducers/categoryReducer';

const NewProblem = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const categories = useSelector(selectCategoriesAll);

    const [name, setName] = useState("");
    const [categoriaid, setCategoriaid] = useState("");
    const [prioridadid, setPrioridad] = useState("");

    const submitCreateProblem = async (e) => {
        e.preventDefault();

        const { problemCreatedSuccessfully } = await dispatch(createProblem(name, categoriaid, prioridadid));

        if (problemCreatedSuccessfully) {
            router.push('/categories/');
        }
    };

    useEffect(() => {
        dispatch(getCategoriesAll());
    }, [dispatch]);

    // Filtrar categorías activas
    const activeCategories = categories.filter(categoria => categoria.isDeleted === "0");

    return (
        <div className='create-problem'>
            <div className='create-problem__header'>
                <div className='create-problem__header__title'>
                    <h1>Nuevo Problema</h1>
                </div>

                <div className='create-problem__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/categories/')}>
                            Categorías
                        </Link>
                        <Typography color="text.primary">Nuevo Problema</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <form className='create-problem__form' onSubmit={submitCreateProblem}>
                <TextField
                    className='create-problem__form__input'
                    label="Nombre del Problema"
                    value={name} 
                    name='name' 
                    type='text'
                    onChange={event => setName(event.target.value)}
                    required
                />
                <FormControl className='create-problem__form__select'>
                    <InputLabel id="select-categoria-label">Categoría</InputLabel>
                    <Select 
                        value={categoriaid}
                        labelId="select-categoria-label"
                        id="select-categoria"
                        label="Categoría"
                        onChange={event => setCategoriaid(event.target.value)}
                    >
                        {activeCategories.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className='create-problem__form__select'>
                    <InputLabel id="select-prioridad-label">Prioridad</InputLabel>
                    <Select 
                        value={prioridadid}
                        labelId="select-prioridad-label"
                        id="select-prioridad"
                        label="Prioridad"
                        onChange={event => setPrioridad(event.target.value)}
                    >
                        <MenuItem value={1}>Bajo</MenuItem>
                        <MenuItem value={2}>Medio</MenuItem>
                        <MenuItem value={3}>Crítico</MenuItem>
                    </Select>
                </FormControl>
                <div className='create-problem__form__button'>
                    <Button 
                        variant="contained" 
                        className='create-problem__form__button__cancel'
                        onClick={() => router.push(`/categories/`)}
                    >
                        Cancelar
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        className='create-problem__form__button__create'
                    >
                        Crear Problema
                    </Button>
                </div>
                
            </form>
        </div>
    );
};

export default NewProblem;
