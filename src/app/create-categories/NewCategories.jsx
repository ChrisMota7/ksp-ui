'use client'
import './NewCategories.scss'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createCategorie} from '@/redux/actions/categoryActions';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel, Breadcrumbs, Link, Typography } from '@mui/material';

const NewCategories = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    
    const submitCreateCategorie = (e) => {
        e.preventDefault();

        dispatch(createCategorie(name))
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
                            Categorias
                        </Link>
                        <Typography color="text.primary">Nueva Categoría</Typography>
                    </Breadcrumbs>
                </div>
            </div>

            <form className='create-categorie__content' onSubmit={submitCreateCategorie}>
                <div className='create-categorie__content__top'> 
                    <TextField
                        className='create-categorie__content__top__input'
                        label="Nombre de la categoría"
                        value={name} 
                        name='name' 
                        type='text'
                        onChange={event => setName(event.target.value)}
                        required
                    />
                    <div className='create-categorie__button-container'>
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

export default NewCategories;