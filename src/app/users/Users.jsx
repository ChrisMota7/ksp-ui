'use client'
import "./Users.scss"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "@/components/UserCard/UserCard";
import EditUserModal from "@/components/EditUserModal/EditUserModal";
import { getUsers } from "@/redux/actions/userAction";
import { selectAdminUsers, selectClientUsers } from "@/redux/reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const clientUsers = useSelector(selectClientUsers);
  const adminUsers = useSelector(selectAdminUsers);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSearchUserByName = (e) => {
    console.log("Searching", e.target.value);
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

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
          {clientUsers?.filter((user) => user.isDeleted === "0").map((user) => (
            <UserCard 
              key={user.id} 
              userid={user.id} 
              name={`${user.firstName} ${user.lastName}`} 
              email={user.email} 
              createdAt={user.createdAt} 
              onEdit={() => handleOpenEditModal(user)}
            />
          ))}
        </div>

        <h3 className='users__content__subtitle'>Usuarios Administradores</h3>
        <div className='users__content__cards'>
          {adminUsers?.filter((user) => user.isDeleted === "0").map((user) => (
            <UserCard 
              key={user.id} 
              userid={user.id} 
              name={`${user.firstName} ${user.lastName}`} 
              email={user.email} 
              createdAt={user.createdAt} 
              onEdit={() => handleOpenEditModal(user)}
            />
          ))}
        </div>
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
}

export default Users;
