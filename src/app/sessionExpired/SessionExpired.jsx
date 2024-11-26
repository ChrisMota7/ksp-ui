'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect } from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Ícono de advertencia de Material UI
import './SessionExpired.scss';

const SessionExpired = () => {
    const router = useRouter();

    useEffect(() => {
        if (!sessionStorage.getItem("sessionExpiredReloaded")) {
          localStorage.clear();
          sessionStorage.setItem("sessionExpiredReloaded", "true");
          window.location.reload();
        }
      }, []);

    return (
        <div className="session-expired">
            <WarningAmberIcon className="session-expired__icon" />
            <h1 className="session-expired__title">Sesión Caducada</h1>
            <p className="session-expired__message">Tu sesión ha caducado. Por favor, inicia sesión nuevamente.</p>
            <button className="session-expired__button" onClick={() => router.push('/')}>Regresar al Login</button>
        </div>
    );
};

export default SessionExpired;