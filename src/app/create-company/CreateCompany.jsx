'use client'
import './CreateCompany.scss'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Breadcrumbs, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { post } from '@/utils/api';

const CreateCompany = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [nombre, setNombre] = useState('');

    const handleCreateCompany = async () => {
        try {
            const response = await post('/user/empresas/', { nombre });
            if (response) {
                dispatch(showSnackbar('Empresa creada exitosamente', 'success'));
                router.push('/users');
            } else {
                dispatch.showSnackbar('Error al crear empresa', 'error');
            }
        } catch (error) {
            dispatch(showSnackbar('Error al crear empresa', 'error'));
        }
    };

    return (
        <div className="create-company">
            <div className="create-company__header">
                <div className='create-company__header__title'>
                    <h1>Crear Empresa</h1>
                </div>
                <div className='create-company__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/users')}>
                            Usuarios
                        </Link>
                        <Typography color="text.primary">Crear Empresa</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <Box className="create-company__form">
                <TextField 
                    label="Nombre" 
                    variant="outlined" 
                    value={nombre} 
                    onChange={(e) => setNombre(e.target.value)} 
                    className="create-company__form__input"
                />
                <Button 
                    variant="contained" 
                    onClick={handleCreateCompany} 
                    className="create-company__form__button"
                >
                    Crear
                </Button>
            </Box>
        </div>
    );
};

export default CreateCompany;
