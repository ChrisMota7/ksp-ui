'use client'
import "./Users.scss"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { Breadcrumbs, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "@/components/UserCard/UserCard";
import { getUsers } from "@/redux/actions/userAction";
import { selectAdminUsers, selectClientUsers } from "@/redux/reducers/userReducer";

const Users = () => {
    const dispatch = useDispatch();
    const router = useRouter()

    const clientUsers = useSelector(selectClientUsers)
    const adminUsers = useSelector(selectAdminUsers)

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    const handleSearchUserByName = (e) => {
        console.log("Searching",e.target.value)
    }

    return (
        <div className='users'>
        <div className='users__header__title'>
            <h1>Usuarios</h1>
            <div className='users__header__title__new-admin'>
                <Button variant="contained" onClick={() => router.push(`/create-admin/`)}>Crear Administrador</Button>
            </div>
        </div>
        <div className='users__header__nav'>
            <Breadcrumbs aria-label="breadcrumb">
                <Typography color="text.primary">HelpDesk</Typography>
                <Typography color="text.primary">Usuarios</Typography>
            </Breadcrumbs>
        </div>
        <div className='users__content'>
            <div className='users__content__searcher'>
                <div className='users__content__searcher__top'>
                    <TextField  
                    className='users__content__searcher__top__input' 
                    id="outlined-basic" 
                    label="Buscar usuario..." 
                    onChange={handleSearchUserByName}
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="start" color="disabled">
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                        ),
                    }}
                    />    
                </div>
            </div>

            <h3 className='users__content__subtitle'>Usuarios Clientes</h3>
            <div className='users__content__cards'>
                {clientUsers?.filter((user) => user.isDeleted === "0").map((user) => 
                    <UserCard key={user.id} name={`${user.firstName} ${user.lastName}`} email={user.email} createdAt={user.createdAt}/>
                )}
            </div>

            <h3 className='users__content__subtitle'>Usuarios Administradores</h3>
            <div className='users__content__cards'>
                {adminUsers?.filter((user) => user.isDeleted === "0").map((user) => 
                    <UserCard key={user.id} name={`${user.firstName} ${user.lastName}`} email={user.email} createdAt={user.createdAt}/>
                )}
            </div>
        </div>
        </div>
    )
}

export default Users