'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { resetPassword as resetPasswordAction } from '@/redux/actions/userAction';
import { showSnackbar } from '@/redux/actions/visualsAction'; 
import './ResetPassword.scss';

const ResetPassword = () => {
    const router = useRouter();
    const [uid, setUid] = useState('');
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [passwordUpdated, setPasswordUpdated] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
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
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Nueva contraseña"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
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
