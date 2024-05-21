'use client'
import './ViewTicket.scss'

import React, { useEffect, useState } from 'react';

import {
    Card, Button, Link, ImageList, ImageListItem, Modal,
    Box, Breadcrumbs, Typography, IconButton, TextField, FormControl, InputLabel, Select, MenuItem,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '@/components/Message/Message';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { createNewMessage, deleteTicket, getMessages, getTicketInfo } from '@/redux/actions/ticketAction';
import { selectTicketMessages, selectTicketInfo, selectTicketFiles } from '@/redux/reducers/ticketReducer';
import { showSnackbar } from '@/redux/actions/visualsAction';

const ViewTicket = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const searchParams = useSearchParams()
    const ticketInfo = useSelector(selectTicketInfo)
    const relatedFiles = useSelector(selectTicketFiles)
    const messages = useSelector(selectTicketMessages)

    const ticketId = searchParams.get('ticketId')

    const [isAdminUser, setIsAdminUser] = useState(false)
    const [openImageModal, setOpenImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [prioridad, setPrioridad] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [file, setFile] = useState([]);
    
    useEffect(() => {
        const interval = setInterval(() => {
          dispatch(getMessages(ticketId))
        }, 30000);
      
        return () => clearInterval(interval)
      }, [])

    const sendNewMessage = async () => {
        setNewMessage("")

        const { messageCreatedSuccessfully } = await dispatch(createNewMessage(newMessage, file, ticketId))

        if (!messageCreatedSuccessfully) {
            dispatch(showSnackbar("Error al enviar mensaje", "error"))
        }
    }

    const loadInfo = async () => {
        const isAdmin = await localStorage.getItem("isAdmin")
        dispatch(getTicketInfo(ticketId));
        setIsAdminUser(isAdmin === "true")
    }

    const handleOpenConfirmDialog = () => {
        setOpenConfirmDialog(true);
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const handleDeleteTicket = async () => {
        const result = await dispatch(deleteTicket(ticketId));
        if (result.ticketDeletedSuccessfully) {
            dispatch(showSnackbar("Ticket finalizado con éxito.", "success"));
            router.push('/tickets'); 
            handleCloseConfirmDialog();
        } else {
            alert("Error al finalizar el ticket.");
        }
    };

    useEffect(() => {
        loadInfo()
    }, [dispatch]);

    const handleImageClick = async (imageUrl) => {
        await setSelectedImage(imageUrl)
        setOpenImageModal(true)
    }

    return(
        <>
        {ticketInfo ? (
            <div className='view-tickets'>
                <div className='view-tickets__header'>
                    <div className="view-tickets__header__container">
                        <div className='view-tickets__header__container__title'>
                            <h1 className='view-tickets__header__container__title__id'>Ticket {ticketInfo.ticket_data.id}</h1>
                            <p className='view-tickets__header__container__title__subject'>{ticketInfo.ticket_data.asunto}</p>
                        </div>
                        <div className='view-tickets__header__container__actions'>
                            <Button variant="contained" onClick={handleOpenConfirmDialog}>Cerrar Ticket</Button>
                        </div>
                    </div>
                    <Dialog
                        open={openConfirmDialog}
                        onClose={handleCloseConfirmDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Confirmar Finalización"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                ¿Estás seguro de que quieres finalizar este ticket?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseConfirmDialog} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleDeleteTicket} color="primary" autoFocus>
                                Finalizar
                            </Button>
                        </DialogActions>
                    </Dialog>

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
                        <Typography color="text.primary">Descripción: {ticketInfo.ticket_data.descripcion}</Typography>
                    
                        <div className='view-tickets__header__info__images'>
                            {relatedFiles.length > 0 ? (
                                    <ImageList sx={{ height: 300 }} cols={relatedFiles.length} gap={8}>
                                        {relatedFiles.map((item) => (
                                            <ImageListItem key={item.id}>
                                                <img
                                                    srcSet={`${item.url}?w=60&h=60&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${item.url}?w=60&h=60&fit=crop&auto=format`}
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
                        <Typography color="text">Creado en: {new Date(ticketInfo.ticket_data.created_at).toLocaleDateString()}</Typography>
                        <Typography color="text.primary">Respuestas: {ticketInfo.total_mensajes} </Typography>
                        <Typography color="text.primary">Ultima respuesta: {ticketInfo.ultimo_remitente}</Typography>
                    </div>
                </div>
                
                <div className='view-tickets__content'>
                    <div className='view-tickets__content__messages'>
                        { messages.length > 0 ? 
                            messages?.map ((message) => 
                                <Message 
                                    text={message.texto} 
                                    createdAt={message.created_at} 
                                    isFromClient={message.isFromClient}/>) 
                            :
                            <div className='view-tickets__content__messages__no-messages'>
                                <p>Aún no hay mensajes</p>
                            </div>
                        }
                    </div>
                </div>

                <div className='view-tickets__content__input-container'>
                    <TextField 
                        value={newMessage} 
                        onChange={event => setNewMessage(event.target.value)} 
                        className='view-tickets__content__input-container__input' 
                        id="outlined" 
                        label="Escribe algo..." 
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') sendNewMessage()
                        }}
                    />    
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

export default ViewTicket;