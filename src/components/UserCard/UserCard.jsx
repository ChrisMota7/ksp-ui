import { Button } from "@mui/material"
import "./UserCard.scss"
import React from 'react'

const UserCard = ({ name, email, createdAt }) => {
  return (
    <div className='user-card'>
        <p className="user-card__fullname">{name}</p>
        <p>{email}</p>
        <p>Creación: {new Date(createdAt).toLocaleDateString()}</p>
        <div className="user-card__delete">
            <Button>Eliminar</Button>
        </div>
    </div>
  )
}

export default UserCard