"use client"

import { login } from "@/redux/actions/authAction";
import "./Login.scss"

import { post } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectJWT, selectUserid } from "@/redux/reducers/authReducer";
import { showSnackbar } from "@/redux/actions/visualsAction";

const Login = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) =>{
        e.preventDefault();
        
        const { userAuthenticationSuccessfully } = await dispatch(login(email, password))

        if (userAuthenticationSuccessfully) {
            router.push("/tickets")
        } else {
            dispatch(showSnackbar("Error de autenticación", "success"))
        }
    }

    return (
        <div className="login">
            <img src="/LogoNegro.png" alt="user-login" className="login__image"/>
            <h1 className="login__title">HELP DESK</h1>
            <h2 className="login__title">Inicio de sesión</h2>
            <form className="login__form" onSubmit={submit}>
                <input type="text" placeholder="Email" className="login__form__input"
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Contraseña" className="login__form__input"
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="login__form__button">Iniciar Sesión</button>
            </form>
            <div className="login__footer">
                <a href="/register">Registrarse</a>
            </div>
        </div>
    )
}

export default Login;