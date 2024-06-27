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
    const { push } = useRouter()
    const dispatch = useDispatch()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [isPasswordsMismatch, setIsPasswordsMismatch] = useState(false)

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const isPasswordsMatch = password === passwordConfirmation
        
        console.log("isPasswordsMatch",isPasswordsMatch)
        if (!isPasswordsMatch) {
            setIsPasswordsMismatch(true)
            return
        }

        if(email.split('@')[1] !== "ksp.com.mx") {
            dispatch(showSnackbar("Lo siento, tu correo debe permanecer a KSP Technologies", "error"))
            return
        }

        console.log("isPasswordsMatch",isPasswordsMatch)
        const { userCreatedSuccessfully } = await dispatch(
            createUser(
                firstName, 
                lastName, 
                email, 
                password, 
                false //isAdmin
            )
        )

        if (userCreatedSuccessfully) {
            dispatch(showSnackbar("Usuario creado exitosamente!", "success"))
            
            push("/")
        }
    }

    const handlePasswordIconClick = () => {
        setIsPasswordVisible(!isPasswordVisible)
    }

    const handleConfirmPasswordIconClick = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        setIsPasswordsMismatch(false)
    }

    const handleConfirmPasswordChange = (e) => {
        setPasswordConfirmation(e.target.value)
        setIsPasswordsMismatch(false)
    }

    return (
        <div className="register">
            <form className='register__form' onSubmit={handleCreateUser}>
                <img src="/LogoNegro.png" height={80} alt="user-login" className="register__form__image"/>
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

                {isPasswordsMismatch && (
                    <p className='register__form__error'>Las contraseñas no coinciden</p>
                )}

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
