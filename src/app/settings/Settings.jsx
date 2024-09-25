'use client'
import { useEffect, useState } from "react";
import "./settings.scss"
import { Breadcrumbs, Button, TextField, Typography, Grid, Tooltip, IconButton, InputAdornment } from "@mui/material"
import { useDispatch } from "react-redux";
import { updateUserDetails, getUsers } from "@/redux/actions/userAction";
import { showSnackbar } from "@/redux/actions/visualsAction";
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Settings = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

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

        if (newPassword && !validatePassword(newPassword, dispatch)) {
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

    const validatePassword = (password, dispatch) => {
        const hasUpperCase = /[A-Z]/;
        const hasNumber = /\d/;
        const hasSpecialChar = /[@$!%*?&]/;
    
        if (!hasUpperCase.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos una letra mayúscula", "error"));
            return false;
        }
    
        if (!hasNumber.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un número", "error"));
            return false;
        }
    
        if (!hasSpecialChar.test(password)) {
            dispatch(showSnackbar("La contraseña debe contener al menos un carácter especial (@$!%*?&)", "error"));
            return false;
        }
    
        if (password.length < 8) {
            dispatch(showSnackbar("La contraseña debe tener al menos 8 caracteres", "error"));
            return false;
        }
    
        return true;
    };
    

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
                        <Typography variant="h5" style={{ marginTop: '15px' }}>
                            Cambiar Contraseña
                            <Tooltip variant="h8" 
                                title={
                                    <div>
                                        La contraseña debe cumplir con los siguientes lineamientos:
                                        <li>Debe tener al menos 8 caracteres.</li>
                                        <li>Debe contener una letra mayúscula.</li>
                                        <li>Debe contener un número.</li>
                                        <li>Debe contener un carácter especial (@$!%*?&).</li>
                                    </div>
                                }
                                arrow
                                placement="right"
                            >
                                <IconButton>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        </Typography>
                        <TextField
                            type={isPasswordVisible ? "text" : "password"}
                            label="Nueva Contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="settings__form__shortInput"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            edge="end"
                                        >
                                            {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            type={isConfirmPasswordVisible ? "text" : "password"}
                            label="Confirmar Nueva Contraseña"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            className="settings__form__shortInput"
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                            edge="end"
                                        >
                                            {isConfirmPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
