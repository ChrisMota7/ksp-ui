import { convertMsToCorrespondingTime } from "@/app/constants"
import "./Message.scss"
import React from 'react'

export const Message = ({text, createdAt, isFromClient}) => {
  const createdFrom = isFromClient === "0" ? "Administrador" : "Colaborador"
  const createdAtDateObject = new Date(createdAt)
  const currentDate = new Date()
  const differenceOnMilliseconds = Math.abs(currentDate-createdAtDateObject)

  const time = convertMsToCorrespondingTime(differenceOnMilliseconds)

  return (
    <div className='message'>
        <div className={`message__container ${createdFrom}`}>
          <p>Respuesta de <strong>{createdFrom}</strong> hace {time}</p>
          <p>{text}</p>
        </div>
    </div>
  )
}
