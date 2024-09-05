'use client'

import "./Register.scss"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUser } from '@/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { showSnackbar } from "@/redux/actions/visualsAction";

const Register = () => {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handleCreateUser = async (e) => {
        e.preventDefault();

        const hasUpperCase = /[A-Z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[@$!%*?&]/;

        if (!hasUpperCase.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos una letra mayúscula", "error"));
            return;
        }

        if (!hasNumber.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un número", "error"));
            return;
        }

        if (!hasSpecialChar.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un carácter especial (@$!%*?&)", "error"));
            return;
        }

        if (password.length < 8) {
            dispatch(showSnackbar("La contraseña debe tener al menos 8 caracteres", "error"));
            return;
        }

        const isPasswordsMatch = password === passwordConfirmation;

        if (!isPasswordsMatch) {
            dispatch(showSnackbar("Las contraseñas no coinciden", "error"));
            return;
        }

        const allowedDomains = {
            "ksp.com.mx": "HDI ",
            "ksp-us.com": "Maxi ",
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
                false, // isAdmin
                telefono
            )
        );

        if (userCreatedSuccessfully) {
            dispatch(showSnackbar("Usuario creado exitosamente!", "success"));
            push("/");
        } else {
            dispatch(showSnackbar("Hubo un error al crear el usuario", "error"));
        }
    }

    const handlePasswordIconClick = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const handleConfirmPasswordIconClick = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleConfirmPasswordChange = (e) => {
        setPasswordConfirmation(e.target.value);
    }

    return (
        <div className="register">
            <form className='register__form' onSubmit={handleCreateUser}>
                <img src="/LogoNegro.png" height={80} alt="user-login" className="register__form__image" />
                <h2 className='register__form__title'>Registro de cliente</h2>

                <TextField
                    type="text"
                    placeholder="Nombre"
                    className='register__form__input'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type="text"
                    placeholder="Apellido"
                    className='register__form__input'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type="email"
                    placeholder="Email: ejemplo@ksp.com.mx"
                    className='register__form__input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type="text"
                    placeholder="Número de Teléfono"
                    className='register__form__input'
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    variant="standard"
                    required
                />
                <TextField
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Contraseña"
                    className='register__form__input'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" color="disabled">
                                <IconButton onClick={handlePasswordIconClick}>
                                    {isPasswordVisible ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                    variant="standard"
                    required
                />
                <TextField
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    className='register__form__input'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start" color="disabled">
                                <IconButton onClick={handleConfirmPasswordIconClick}>
                                    {isConfirmPasswordVisible ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <VisibilityIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    value={passwordConfirmation}
                    onChange={handleConfirmPasswordChange}
                    variant="standard"
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Registrarse
                </Button>
            </form>
        </div>
    );
};

export default Register;
