'use client'
import './ViewTicket.scss'

import React, { useEffect, useState } from 'react';

import { Card, Button, Link, ImageList, ImageListItem, Modal, 
    Box, Breadcrumbs, Typography, IconButton, Dialog, DialogContent, 
    TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AdminMessage } from '@/components/AdminMessage/AdminMessage';
import { ClientMessage } from '@/components/ClientMessage/ClientMessage';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { createNewMessage, getTicketInfo, updateTicketPriority } from '@/redux/actions/ticketAction';
import { selectTicketMessages, selectTicketInfo, selectTicketFiles } from '@/redux/reducers/ticketReducer';

export default function verTicket () {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    const ticketInfo = useSelector(selectTicketInfo)
    const relatedFiles = useSelector(selectTicketFiles)
    const messages = useSelector(selectTicketMessages)

    console.log("ticketInfo",ticketInfo)
    
    const ticketId = searchParams.get('ticketId')

    const [isAdminUser, setIsAdminUser] = useState(false)
    const [openImageModal, setOpenImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [prioridad, setPrioridad] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState([]);

    // const images = [
    //     {
    //         id: 1,
    //         img: "./cat1.jpeg",
    //         title: "Cat 1"
    //     },
    //     {
    //         id: 2,
    //         img: "./cat2.jpg",
    //         title: "Cat 2"
    //     },
    //     {
    //         id: 3,
    //         img: "./cat3.jpg",
    //         title: "Cat 3"
    //     },
    //     {
    //         id: 4,
    //         img: "./cat2.jpg",
    //         title: "Cat 4"
    //     },
    //     {
    //         id: 5,
    //         img: "./cat3.jpg",
    //         title: "Cat 5"
    //     }
    // ]

    const sendNewMessage = () => {
        dispatch(createNewMessage(newMessage, file, ticketId))
        setNewMessage("")
    }

    const handlePrioridadChange = async (event) => {
        const prioridadId = event.target.value

        setPrioridad(prioridadId)
        console.log("prioridad", prioridadId)
        const { setPrioridadSuccessfully } = await dispatch(updateTicketPriority(ticketId, prioridadId))
    }

    const loadInfo = async () => {
        const isAdmin = await localStorage.getItem("isAdmin")
        dispatch(getTicketInfo(ticketId));
        setIsAdminUser(isAdmin === "true")
    }

    useEffect(() => {
        loadInfo()
    }, [dispatch]);

    const handleImageClick = async (imageUrl) => {
        await setSelectedImage(imageUrl)
        setOpenImageModal(true)
        console.log("clicked!!")
    }

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
                        <div className='view-tickets__header__container__actions'>
                            { isAdminUser && (
                                <FormControl className='view-tickets__header__container__actions__priority-select'>
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
                            )}
                            <Button variant="contained" onClick={() => router.push('/tickets')}>Finalizar Ticket</Button>
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
                    
                        <div className='view-tickets__header__info__images'>
                            {relatedFiles.length > 0 ? (
                                    <ImageList cols={relatedFiles.length} gap={8}>
                                        {relatedFiles.map((item) => (
                                            <ImageListItem key={item.id}>
                                                <img
                                                    srcSet={`${item.url}?w=82&h=82&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${item.url}?w=82&h=82&fit=crop&auto=format`}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    onClick={() => handleImageClick(item.url)}
                                                />
                                            </ImageListItem>
                                        ))}
                                    </ImageList>
                            ) : (
                                <p>Sin evidencias para mostrar</p>
                            )}
                        </div>

                        <hr />

                        <Typography color="text">Creado en: {ticketInfo.created_at} </Typography>
                        <Typography color="text.primary">Respuestas: </Typography>
                        <Typography color="text.primary">Ultima respuesta: </Typography>
                    </div>
                </div>
                
                <div className='view-tickets__content'>
                    <div className='view-tickets__content__messages'>
                        { messages.length > 0 ? 
                            messages?.map ((message) => 
                                message.isFromClient === '0' ? 
                                <AdminMessage text={message.texto}/> : 
                                <ClientMessage text={message.texto}/>)
                            :
                            <div className='view-tickets__content__messages__no-messages'>
                                <p>Aún no hay mensajes</p>
                            </div>
                        }
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
                
            <Dialog
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className='view-tickets__content__modal'
            >
                <IconButton
                aria-label="close"
                onClick={() => setOpenImageModal(false)}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <Box>
                        <img src={selectedImage} alt="Imagen seleccionada" />
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
            ) : (
                <div>
                    <h1>No hay información del ticket</h1>
                </div>
            )}
            
        </>
        
    )
}