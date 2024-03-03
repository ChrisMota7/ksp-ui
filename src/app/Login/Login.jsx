"use client"

import "./Login.scss"

import { post } from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = async (e) =>{
        e.preventDefault();

        try {
            const response = await post("/auth/login", { email, password })
            if (response.jwt) {
                router.push("/tickets")
            }
        } catch (e) {
            console.log(e)
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
        </div>
    )
}

export default Login;