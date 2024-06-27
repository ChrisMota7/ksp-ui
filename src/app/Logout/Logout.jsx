'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/actions/authAction';
import Loader from '../../components/Loader/Loader';

const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const handleLogout = async () => {
            const { userLoggedOutSuccessfully } = await dispatch(logout());
            if (userLoggedOutSuccessfully) {
                router.push('/');
            }
        };

        handleLogout();
    }, [dispatch, router]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1>Cerrando sesión...</h1>
            <Loader />
        </div>
    );
};

export default Logout;
