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
    const { push } = useRouter();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        generatePassword();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();

        const hasUpperCase = /[A-Z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[@$!%*?&.]/;

        if (!hasUpperCase.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos una letra mayúscula", "error"));
            return;
        }

        if (!hasNumber.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un número", "error"));
            return;
        }

        if (!hasSpecialChar.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un carácter especial (@$!%*?&.)", "error"));
            return;
        }

        if (password.length < 8) {
            dispatch(showSnackbar("La contraseña debe tener al menos 8 caracteres", "error"));
            return;
        }

        const allowedDomains = {
            "ksp.com.mx": "HDI",
            "ksp-us.com": "Maxi",
            "ksptech.com.mx": "El potosi",
            "ksp-it.com": "Administrativos"
        };

        const emailDomain = email.split('@')[1];
        const empresa = allowedDomains[emailDomain];

        if (!empresa) {
            dispatch(showSnackbar("Lo siento, tu correo debe pertenecer a KSP Technologies", "error"));
            return;
        }

        const { userCreatedSuccessfully } = await dispatch(
            createUser(
                firstName,
                lastName,
                email,
                password,
                empresa,
                true, // isAdmin
                telefono
            )
        );

        if (userCreatedSuccessfully) {
            dispatch(showSnackbar("Usuario creado satisfactoriamente", "success"));
            push("/users");
        } else {
            dispatch(showSnackbar("Hubo un error al crear el usuario", "error"));
        }
    };

    const generatePassword = () => {
        const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
        const numberChars = '0123456789';
        const specialChars = '@$!%*?&.';

        const allChars = upperCaseChars + lowerCaseChars + numberChars + specialChars;

        let generatedPassword = '';

        // Garantizar al menos un carácter de cada tipo
        generatedPassword += upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)];
        generatedPassword += lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)];
        generatedPassword += numberChars[Math.floor(Math.random() * numberChars.length)];
        generatedPassword += specialChars[Math.floor(Math.random() * specialChars.length)];

        // Rellenar el resto de la contraseña con caracteres aleatorios
        for (let i = 4; i < 8; i++) {
            generatedPassword += allChars[Math.floor(Math.random() * allChars.length)];
        }

        // Mezclar la contraseña generada para evitar un patrón predecible
        setPassword(generatedPassword.split('').sort(() => Math.random() - 0.5).join(''));
    };

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
                <TextField
                    type="text"
                    placeholder="Número de Teléfono"
                    className='create-admin__form__input'
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
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
                <div>
                <Button
                    className='create-admin__button__cancel'
                    variant="contained" 
                    onClick={() => push(`/users/`)}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit" 
                    variant="contained" 
                    className='create-admin__button__create'
                >
                    Crear Administrador
                </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateAdmin;
