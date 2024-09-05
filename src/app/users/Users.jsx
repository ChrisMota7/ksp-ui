'use client'
import "./Users.scss"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, Button, IconButton, InputAdornment, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "@/components/UserCard/UserCard";
import EditUserModal from "@/components/EditUserModal/EditUserModal";
import YoutubeSearchedForOutlinedIcon from '@mui/icons-material/YoutubeSearchedForOutlined';
import { filterUsersByName, getUsers, removeUsersFilter, getEmpresas, filterUsersByEmpresa } from "@/redux/actions/userAction";
import { selectAdminUsers, selectClientUsers, selectFilteredUsers, selectEmpresas } from "@/redux/reducers/userReducer";

const Users = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const clientUsers = useSelector(selectClientUsers);
    const adminUsers = useSelector(selectAdminUsers);
    const empresas = useSelector(selectEmpresas);
    const filteredUsers = useSelector(selectFilteredUsers);
    const [selectedEmpresa, setSelectedEmpresa] = useState('');

    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [isFilterOn, setIsFilterOn] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getEmpresas());
    }, [dispatch]);

    const handleSearchUserByName = (e) => {
        const filter = e.target.value;
        setFilterValue(filter);
        if (filter === "") {
            handleRemoveFilter();
        } else {
            dispatch(filterUsersByName(filter));
            setIsFilterOn(true);
        }
    };

    const handleRemoveFilter = () => {
        dispatch(removeUsersFilter());
        setIsFilterOn(false);
        setFilterValue("");
        setSelectedEmpresa('');
    };

    const handleOpenEditModal = (user) => {
        setSelectedUser(user);
        setOpenEditModal(true);
    };

    const handleCloseEditModal = () => {
        setOpenEditModal(false);
        setSelectedUser(null);
    };

    const handleEmpresaChange = (e) => {
        const empresaId = e.target.value;
        setSelectedEmpresa(empresaId);
        if (empresaId === '') {
            handleRemoveFilter();
        } else {
            dispatch(filterUsersByEmpresa(empresaId));
            setIsFilterOn(true);
        }
    };

    // Filtrar empresas activas
    const activeEmpresas = empresas.filter(empresa => empresa.isDeleted === "0");

    return (
        <div className='users'>
            <div className='users__header__title'>
                <h1>Usuarios</h1>
                <div className='users__header__title__buttons'>
                    <Button variant="contained" className="admin-button" onClick={() => router.push(`/create-admin/`)}>Crear Administrador</Button>
                    <Button variant="contained" className="company-button" onClick={() => router.push(`/clients/`)}>Ver Clientes</Button>
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
                        <Box display="flex" alignItems="center" width="100%">
                            <TextField
                                className='users__content__searcher__top__input'
                                id="outlined-basic"
                                label="Buscar usuario..."
                                onChange={handleSearchUserByName}
                                value={filterValue}
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
                            <FormControl className='users__content__searcher__select' sx={{ marginLeft: 2, minWidth: 200 }}>
                                <InputLabel id="empresa-select-label">Clientes</InputLabel>
                                <Select
                                    labelId="empresa-select-label"
                                    value={selectedEmpresa}
                                    label="Empresa"
                                    onChange={handleEmpresaChange}
                                >
                                    <MenuItem value="">Todas las Empresas</MenuItem>
                                    <MenuItem value="no_empresa">Sin Empresa</MenuItem>
                                    {activeEmpresas.map((empresa) => (
                                        <MenuItem key={empresa.id} value={empresa.id}>{empresa.nombre}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <IconButton onClick={handleRemoveFilter} sx={{ marginLeft: 2 }}>
                                <YoutubeSearchedForOutlinedIcon className={isFilterOn && "iconFiltered"} />
                            </IconButton>
                        </Box>
                    </div>
                </div>

                {isFilterOn ? (
                    filteredUsers && filteredUsers.length > 0 ? (
                        <div>
                            <h3 className='users__content__subtitle'>Usuarios filtrados</h3>
                            <div className='users__content__all-users-cards'>
                                {filteredUsers.filter((user) => user.isDeleted === "0").map((user) =>
                                    <UserCard
                                        key={user.id}
                                        userid={user.id}
                                        name={`${user.firstName} ${user.lastName}`}
                                        email={user.email}
                                        telefono={user.telefono}
                                        createdAt={user.createdAt}
                                        isAdmin={user.isAdmin === "1" ? true : false}
                                        empresa={user.empresa ? user.empresa.nombre : 'Sin Empresa'}
                                        filteredUser={true}
                                        onEdit={() => handleOpenEditModal(user)}
                                    />
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className='users__content__not-found'>No se encontraron usuarios con ese criterio</p>
                    )
                ) : (
                    <div>
                        <h3 className='users__content__subtitle'>Usuarios Clientes</h3>
                        <div className='users__content__cards'>
                            {clientUsers.length > 0 ? clientUsers.filter((user) => user.isDeleted === "0").map((user) => (
                                <UserCard
                                    key={user.id}
                                    userid={user.id}
                                    name={`${user.firstName} ${user.lastName}`}
                                    email={user.email}
                                    telefono={user.telefono}
                                    createdAt={user.createdAt}
                                    empresa={user.empresa ? user.empresa.nombre : 'Sin Empresa'}
                                    onEdit={() => handleOpenEditModal(user)}
                                />)
                            ) : (
                                <p>Sin usuarios</p>
                            )}
                        </div>

                        <h3 className='users__content__subtitle'>Usuarios Administradores</h3>
                        <div className='users__content__cards'>
                            {adminUsers.length > 0 ? adminUsers.filter((user) => user.isDeleted === "0").map((user) =>
                                <UserCard
                                    key={user.id}
                                    userid={user.id}
                                    name={`${user.firstName} ${user.lastName}`}
                                    email={user.email}
                                    telefono={user.telefono}
                                    createdAt={user.createdAt}
                                    empresa={user.empresa ? user.empresa.nombre : 'Sin Empresa'}
                                    onEdit={() => handleOpenEditModal(user)}
                                />
                            ) : (
                                <p>Sin usuarios</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {selectedUser && (
                <EditUserModal
                    openEditUser={openEditModal}
                    handleCloseEditUser={handleCloseEditModal}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default Users;
