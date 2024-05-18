import "./AdminMessage.scss"
import React from 'react'

export const AdminMessage = ({text}) => {
  return (
    <div className='admin-message'>
        <div className='admin-message__container'>
          <p>Respuesta de <strong>administrador</strong> hace 23 horas</p>
          <p>{text}</p>
        </div>
    </div>
  )
}
