'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography, FormHelperText, InputAdornment, IconButton, Tooltip } from '@mui/material';
import { resetPassword as resetPasswordAction } from '@/redux/actions/userAction';
import { showSnackbar } from '@/redux/actions/visualsAction'; 
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './ResetPassword.scss';
import InfoIcon from '@mui/icons-material/Info';

const ResetPassword = () => {
    const router = useRouter();
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryUid = searchParams.get('uid');
        const queryToken = searchParams.get('token');
        console.log('Extracted UID:', queryUid);
        console.log('Extracted Token:', queryToken);
        
        if (queryUid && queryToken) {
            setUid(queryUid);
            setToken(queryToken);
        } else {
            dispatch(showSnackbar("Missing necessary parameters UID or Token.", "error"));
        }
    }, [dispatch]);

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
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Validación de la nueva contraseña
        if (!validatePassword(newPassword, dispatch)) {
            return;
        }
    
        console.log("Submitting with UID:", uid, "Token:", token, "New Password:", newPassword);
        
        if (!uid || !token) {
            dispatch(showSnackbar("Invalid or missing UID/Token", "error"));
            return;
        }
        
        const response = await dispatch(resetPasswordAction(uid, token, newPassword));
        if (response.resetPasswordSuccessfully) {
            setPasswordUpdated(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } else {
            dispatch(showSnackbar("Error updating password", "error"));
        }
    };
    

    return (
        <div className="request-reset">
            {passwordUpdated ? (
                <Typography variant="h5" component="h2" color="green">
                    Contraseña actualizada. Redirigiendo al login...
                </Typography>
            ) : (
                <>
                    <h1>Escribe tu nueva contraseña</h1>
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
                    <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nueva contraseña"
                        type={isPasswordVisible ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                        {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                        <Button type="submit" variant="contained" color="primary">
                            Reestablecer
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default ResetPassword;
