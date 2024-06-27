'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendPasswordResetEmail } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";
import { Button, TextField, Typography } from "@mui/material";
import './RequestPassword.scss';

const RequestReset = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const { sendPasswordResetEmailSuccessfully } = await dispatch(sendPasswordResetEmail(email));

        if (sendPasswordResetEmailSuccessfully) {
            dispatch(showSnackbar("Email enviado. Por favor, revisa tu bandeja de entrada.", "success"));
        } else {
            dispatch(showSnackbar("Error al enviar el email", "error"));
        }
    };

    return (
        <div className="request-reset">
            <Typography variant="h4" component="h2">
                ¿Olvidaste tu contraseña?
            </Typography>
            <Typography variant="h5" component="h4">
                Ingresa tu Email
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="email@ksp.com.mx"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    Solicitar
                </Button>
            </form>
        </div>
    );
}

export default RequestReset;
