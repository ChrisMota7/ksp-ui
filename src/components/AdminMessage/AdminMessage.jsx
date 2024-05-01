import "./AdminMessage.scss"
import React from 'react'

export const AdminMessage = ({text}) => {
  return (
    <div className='admin-message'>
        <div className='admin-message__container'>
            <p>{text}</p>
        </div>
    </div>
  )
}
