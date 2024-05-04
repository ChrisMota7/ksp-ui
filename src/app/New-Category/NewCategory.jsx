'use client'
import './NewCategory.scss'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createProblem } from '@/redux/actions/categoryActions';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Breadcrumbs, Link, Typography } from '@mui/material';

const NewCategory = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [categoriaid, setCategoriaid] = useState("");

    const submitCreateProblem = (e) => {
        e.preventDefault();

        dispatch(createProblem(name, categoriaid))
    }

    return (
        <div className='create-problem'>
            <div className='create-problem__header'>
                <div className='create-problem__header__title'>
                    <h1>Nueva Categoría</h1>
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
                            value={categoriaid} name='categoria'
                            labelId="select-label"
                            id="select"
                            label="categoria"
                            onChange={event => setCategoriaid(event.target.value)}
                        >
                            <MenuItem value={1}>Hardware</MenuItem>
                            <MenuItem value={2}>Software</MenuItem>
                            <MenuItem value={3}>Logística</MenuItem>
                        </Select>
                    </FormControl>

                    <div className='create-problem__button-container'>
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            onClick={() => router.push(`/categories/`)}>
                                Crear Problema
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewCategory;