'use client'
import "./settings.scss"
import { Breadcrumbs, Button, TextField, Typography } from "@mui/material"

const Settings = () => {
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

            <form className='settings__form' >
                <TextField
                    placeholder="Contraseña"
                    className='settings__form__input'
                />
                <TextField
                    placeholder="Confirmar contraseña"
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