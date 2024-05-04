'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { post } from "@/utils/api"; // Asegúrate de tener esta utilidad para hacer llamadas API
import { createUser } from '@/redux/actions/authAction';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';


const Register = () => {
    const router = useRouter()
    const dispatch = useDispatch()


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setisAdmin] = useState('');

    const submitCreateUser = async (e) => {
        e.preventDefault();
        
        const { CreateUserSuccessfully } = await dispatch(createUser(firstName, lastName, email, password, isAdmin))

        if (CreateUserSuccessfully) {
            router.push(`/`)
        }
    }

    return (
        <div className="register">
            <h2>Registro</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={submitCreateUser}>
                <TextField
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    // required
                />
                <TextField
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <TextField
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // required
                />
                <TextField
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // required
                />
                 
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
