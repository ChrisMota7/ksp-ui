'use client'

import "./CreateAdmin.scss"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { Breadcrumbs, Button, TextField, Typography, Link } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import { showSnackbar } from "@/redux/actions/visualsAction";

const CreateAdmin = () => {
    const { push } = useRouter()
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        generatePassword()
    }, [])

    const handleCreateUser = async (e) => {
        e.preventDefault();

        if(email.split('@')[1] !== "ksp.com.mx") {
            dispatch(showSnackbar("Lo siento, tu correo debe permanecer a KSP Technologies", "error"))
            return
        }

        const { userCreatedSuccessfully } = await dispatch(
            createUser(
                firstName, 
                lastName, 
                email, 
                password, 
                true //isAdmin
            )
        )

        if (userCreatedSuccessfully) {
            dispatch(showSnackbar("Usuario creado satisfactoriamente", "success"))
            push("/users")
        }
    }

    const generatePassword = () => {
        const strings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
        let generatedPassowrd = ""
        
        for (let i = 1; i <= 5; i++) {
            let char = Math.floor(Math.random()
                * strings.length + 1);
     
            generatedPassowrd += strings.charAt(char)
        }

        setPassword(generatedPassowrd)
    }

    return (
        <div className="create-admin">
            <div className="create-admin__header">
                <div className='create-admin__header__title'>
                    <h1>Crea usuario administrador</h1>
                </div>

                <div className='create-admin__header__nav'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" onClick={() => push('/users')}>
                        Usuarios
                    </Link>
                    <Typography color="text.primary">Crear Administrador</Typography>
                </Breadcrumbs>
                </div>
            </div>
            <form className='create-admin__form' onSubmit={handleCreateUser}>
                <TextField
                    type="text"
                    placeholder="Nombre"
                    className='create-admin__form__input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type="text"
                    placeholder="Apellido"
                    className='create-admin__form__input'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type="email"
                    placeholder="Correo electrónico"
                    className='create-admin__form__input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    required
                />

                <div className="create-admin__form__password">
                    <p className='create-admin__form__password__text'>Contraseña automática: {password}</p>
                    <Button
                        variant="outlined" 
                        color="success"
                        startIcon={<LockResetIcon />}
                        onClick={() => generatePassword()}
                    >
                        Regenerar password
                    </Button>
                </div>

                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                >
                    Crear Administrador
                </Button>
            </form>
        </div>
    );
};

export default CreateAdmin;
