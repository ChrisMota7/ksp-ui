"use client"

import { login } from "@/redux/actions/authAction";
import "./Login.scss"

import { post } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJWT, selectUserid } from "@/redux/reducers/authReducer";
import { showSnackbar } from "@/redux/actions/visualsAction";
import { Link } from "@mui/material";

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) =>{
        e.preventDefault();
        
        const { userAuthenticationSuccessfully, message } = await dispatch(login(email, password))

        if (userAuthenticationSuccessfully) {
            router.push("/tickets")
        } else {
            dispatch(showSnackbar(message, "error"))
        }
    }

    return (
        <div className="login">
            <img src="/LogoNegro.png" alt="user-login" className="login__image"/>
            <h2 className="login__title">HELP DESK</h2>
            <h1 className="login__title">Inicio de sesión</h1>
            <form className="login__form" onSubmit={submit}>
                <input 
                    type="text" 
                    placeholder="Email" 
                    className="login__form__input"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    className="login__form__input"
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <div className="login__form__link">
                    <Link  href="/requestPassword" underline="hover" color="inherit">¿Olvidaste tu contraseña?</Link>
                </div>
                <button className="login__form__button">Iniciar Sesión</button>
            </form>
            <div className="login__footer">
                <Link href="/register" underline="hover" color="inherit">Registrarse</Link>
            </div>
        </div>
    )
}

export default Login;