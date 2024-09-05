'use client'
import { useEffect, useState } from "react";
import "./settings.scss"
import { Breadcrumbs, Button, TextField, Typography, Grid } from "@mui/material"
import { useDispatch } from "react-redux";
import { updateUserDetails, getUsers } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";

const Settings = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('userid');
            const { getUsersSuccessfully, allUsers } = await dispatch(getUsers());
            if (getUsersSuccessfully) {
                const currentUser = allUsers.find(user => user.id === parseInt(userId));
                setUser(currentUser);
                setNewPhoneNumber(currentUser.telefono);
            }
        };

        fetchUser();
    }, [dispatch]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword && newPassword !== confirmNewPassword) {
            dispatch(showSnackbar("Las contraseñas no coinciden", "error"));
            return;
        }
    
        const userId = localStorage.getItem('userid');
        const { setUpdateUserSuccess } = await dispatch(updateUserDetails(userId, user.email, newPassword, user.empresa.id, newPhoneNumber));
    
        if (setUpdateUserSuccess) {
            dispatch(showSnackbar("Datos actualizados", "success"));
            setUser({ ...user, telefono: newPhoneNumber });
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            dispatch(showSnackbar("Error al actualizar los datos", "error"));
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
                <Typography color="text.primary">Configuración</Typography>
                </Breadcrumbs>
            </div>

            <Grid container spacing={3} className="settings__content">
                <Grid item xs={12} md={6} className="settings__info">
                    <Typography variant="h5">Información del Usuario</Typography>
                    {user ? (
                        <div>
                            <TextField
                                label="Nombre"
                                value={`${user.firstName} ${user.lastName}`}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Correo Electrónico"
                                value={user.email}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Teléfono"
                                value={user.telefono}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                            <TextField
                                label="Empresa"
                                value={user.empresa.nombre}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                        </div>
                    ) : (
                        <p>Cargando información del usuario...</p>
                    )}
                </Grid>
                
                <Grid item xs={12} md={6} className="settings__form">
                    <Typography variant="h5">Editar Información</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nuevo Número de Teléfono"
                            value={newPhoneNumber}
                            onChange={(e) => setNewPhoneNumber(e.target.value)}
                            className="settings__form__shortInput"
                            margin="normal"
                        />
                        <Typography variant="h5" style={{ marginTop: '20px' }}>Cambiar Contraseña</Typography>
                        <TextField
                            type="password"
                            label="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="settings__form__shortInput"
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="Confirmar Nueva Contraseña"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="settings__form__shortInput"
                            margin="normal"
                        />
                        <Button
                            type="submit" 
                            className="settings__form__button"
                            variant="contained" 
                            color="primary"
                            // style={{ marginTop: '20px' }}
                        >
                            Guardar Cambios
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default Settings;
