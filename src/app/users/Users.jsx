'use client'
import "./Users.scss"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, Button, IconButton, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import UserCard from "@/components/UserCard/UserCard";
import EditUserModal from "@/components/EditUserModal/EditUserModal";
import FilterListIcon from '@mui/icons-material/FilterList';
import { filterUsersByName, getUsers, removeUsersFilter } from "@/redux/actions/userAction";
import { selectAdminUsers, selectClientUsers, selectFilteredUsers } from "@/redux/reducers/userReducer";

const Users = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const clientUsers = useSelector(selectClientUsers);
  const adminUsers = useSelector(selectAdminUsers);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const filteredUsers = useSelector(selectFilteredUsers)

  const [isFilterOn, setIsFilterOn] = useState(false)
  const [filterValue, setFilterValue] = useState("")

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleSearchUserByName = (e) => {
    const filter = e.target.value
    setFilterValue(filter)
    if (filter === "") {
      handleRemoveFilter()
    } else {
      dispatch(filterUsersByName(filter))
      setIsFilterOn(true)
    }
  }

  const handleRemoveFilter = () => {
    dispatch(removeUsersFilter())
    setIsFilterOn(false)
    setFilterValue("")
  }

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
            <IconButton onClick={handleRemoveFilter}>
              <FilterListIcon className={isFilterOn && "iconFiltered"} />
            </IconButton>
          </div>
        </div>

        {isFilterOn ? (
          filteredUsers.length > 0 ? (
            <div>
              <h3 className='users__content__subtitle'>Usuarios filtrados</h3>
              <div className='users__content__all-users-cards'>
                {filteredUsers?.filter((user) => user.isDeleted === "0").map((user) =>
                  <UserCard
                    key={user.id}
                    userid={user.id}
                    name={`${user.firstName} ${user.lastName}`}
                    email={user.email}
                    createdAt={user.createdAt}
                    isAdmin={user.isAdmin === "1" ? true : false}
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
              {clientUsers.length > 0 ? clientUsers?.filter((user) => user.isDeleted === "0").map((user) => (
                <UserCard
                  key={user.id}
                  userid={user.id}
                  name={`${user.firstName} ${user.lastName}`}
                  email={user.email}
                  createdAt={user.createdAt}
                  onEdit={() => handleOpenEditModal(user)}
                />)
              ) : (
                <p>Sin usuarios</p>
              )}
            </div>

            <h3 className='users__content__subtitle'>Usuarios Administradores</h3>
            <div className='users__content__cards'>
              {adminUsers.length > 0 ? adminUsers?.filter((user) => user.isDeleted === "0").map((user) =>
                <UserCard 
                  key={user.id} 
                  userid={user.id} 
                  name={`${user.firstName} ${user.lastName}`} 
                  email={user.email} 
                  createdAt={user.createdAt} 
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
  )
}

export default Users;
