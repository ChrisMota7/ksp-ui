import "./ClientMessage.scss"
import React from 'react'

export const ClientMessage = ({text}) => {
  return (
    <div className='client-message'>
        <div className='client-message__container'>
          <p>Respuesta de <strong>Abraham Aguilar</strong> hace 23 horas</p>  
          <p>{text}</p>
        </div>
    </div>
  )
}
