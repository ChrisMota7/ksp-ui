'use client'
import { useState } from "react";
import "./settings.scss"
import { Breadcrumbs, Button, TextField, Typography } from "@mui/material"
import { useDispatch } from "react-redux";
import { updatePasswordUser } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";

const Settings = () => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            dispatch(showSnackbar("Las contraseñas no coinciden", "error"));
            return;
        }
        const userId = localStorage.getItem('userid');
        
        const { setUpdatePasswordUserSuccessfully } = await dispatch(updatePasswordUser(userId, newPassword));

        if ( setUpdatePasswordUserSuccessfully ) {
            dispatch(showSnackbar("Contraseña actualizada", "success"));
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            dispatch(showSnackbar("Error al actualizar la contraseña", "error"));
        }
    }

    return(
        <div className="settings">
            <div className='settings__header__title'>
                <h1>Configuración</h1>
            </div>
            <div className='settings__header__nav'>
                <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">HelpDesk</Typography>
                <Typography color="text.primary">configuración</Typography>
                </Breadcrumbs>
            </div>

            <div className="settings__subTittle">
                <h4>Cambiar contraseña</h4>
            </div>

             <form className='settings__form' onSubmit={handleSubmit}>
                <TextField
                    type="password"
                    label="Nueva Contraseña"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className='settings__form__input'
                />
                <TextField
                    type="password"
                    label="Confirmar Nueva Contraseña"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className='settings__form__input'
                />
                <Button
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className="settings__form__button"
                >
                    Cambiar contraseña
                </Button>
            </form>
        </div>
    )
}

export default Settings