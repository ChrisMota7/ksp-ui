'use client'
import './ViewTicket.scss'

import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AdminMessage } from '@/components/AdminMessage/AdminMessage';
import { ClientMessage } from '@/components/ClientMessage/ClientMessage';
import { Button, Link, Breadcrumbs, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { createNewMessage, getTicketInfo, updateTicketPriority } from '@/redux/actions/ticketAction';
import { selectTicketMessages, selectTicketInfo } from '@/redux/reducers/ticketReducer';

export default function verTicket () {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    const ticketInfo = useSelector(selectTicketInfo)
    const messages = useSelector(selectTicketMessages)
    
    const ticketId = searchParams.get('ticketId')
    const [prioridad, setPrioridad] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState([]);

    const sendNewMessage = () => {
        dispatch(createNewMessage(newMessage, file, ticketId))
        setNewMessage("")
    }

    const handlePrioridadChange = async (event) => {
        const prioridadId = event.target.value

        setPrioridad(prioridadId)

        const { setPrioridadSuccessfully } = await dispatch(updateTicketPriority(ticketId, prioridadId))
    }

    const loadInfo = () => {
        dispatch(getTicketInfo(ticketId));
    }

    useEffect(() => {
        loadInfo()
    }, [dispatch]);

    return(
        <>
            {ticketInfo ? (
                <div className='view-tickets'>
                <div className='view-tickets__header'>
                    <div className="view-tickets__header__container">
                        <div className='view-tickets__header__container__title'>
                            <h1 className='view-tickets__header__container__title__id'>Ticket {ticketInfo.id}</h1>
                            <p className='view-tickets__header__container__title__subject'>{ticketInfo.asunto}</p>
                        </div>
                        <div >
                            <Button variant="contained" onClick={() => router.push('/tickets')}>Finalizar Ticket</Button>
                            <FormControl >
                                <InputLabel id="select-label">Definir prioridad</InputLabel>
                                <Select 
                                    value={prioridad} name='prioridad'
                                    labelId="select-label"
                                    id="select"
                                    label="prioridad"
                                    onChange={handlePrioridadChange}
                                >
                                    <MenuItem value={1}>Alta</MenuItem>
                                    <MenuItem value={2}>Media</MenuItem>
                                    <MenuItem value={3}>Baja</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className='view-tickets__header__container'>
                        <div className='view-tickets__header__container__breadcrumbs'>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Typography color="text.primary">HelpDesk</Typography>
                                <Link underline="hover" color="inherit" onClick={() => router.push('/tickets')}>
                                    Tickets
                                </Link>
                                <Typography color="text.primary">Ver ticket</Typography>
                            </Breadcrumbs>
                        </div>
                    </div>

                    <div className='view-tickets__header__info'> 
                        <Typography color="text.primary">Descripción: {ticketInfo.descripcion}</Typography>
                        <div>IMAGE</div>

                        <hr />

                        <Typography color="text">Creado en: {ticketInfo.created_at} </Typography>
                        <Typography color="text.primary">Respuestas: </Typography>
                        <Typography color="text.primary">Ultima respuesta: </Typography>
                    </div>
                </div>
                
                <div className='view-tickets__content'>
                    <div className='view-tickets__content__messages'>
                        { messages?.map ((message) => message.isFromClient === '0' ? <AdminMessage text={message.texto}/> : <ClientMessage text={message.texto}/> )}
                    </div>
                </div>

                <div className='view-tickets__content__input-container'>
                    <TextField value={newMessage} onChange={event => setNewMessage(event.target.value)} className='view-tickets__content__input-container__input' id="outlined" label="Escribe algo..." />    
                    <IconButton aria-label="uploadFile" size="large">
                        <FileUploadOutlinedIcon fontSize="large" />
                        <input type="file" name="myfile" className='view-tickets__content__input-container__file' />
                    </IconButton>
                    <IconButton aria-label="sendMessage" onClick={sendNewMessage} size="large">
                        <NearMeOutlinedIcon fontSize="large" />
                    </IconButton>
                    <IconButton aria-label="refresh" onClick={loadInfo} size="large">
                        <ReplayOutlinedIcon fontSize="medium" />
                    </IconButton>
                </div>
            </div>
            ) : (
                <div>
                    <h1>No hay información del ticket</h1>
                </div>
            )}
            
        </>
        
    )
}