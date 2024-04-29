'use client'
import './ViewTicket.scss'

import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AdminMessage } from '@/components/AdminMessage/AdminMessage';
import { ClientMessage } from '@/components/ClientMessage/ClientMessage';
import { Card, Button, Link } from "@mui/material"
import {TextField } from "@mui/material"
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import { getTicketInfo } from '@/redux/actions/ticketAction';

export default function verTicket () {
    const router = useRouter()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTicketInfo());
    }, [dispatch]);

    return(
        <div className='view-tickets'>
            <div className='view-tickets__header'>
                <div className="view-tickets__header__container">
                    <div className='view-tickets__header__container__title'>
                        <h1 className='view-tickets__header__container__title__id'>Ticket #1</h1>
                        <p className='view-tickets__header__container__title__subject'>Laptop ya no carga</p>
                    </div>
                    <Button variant="contained" onClick={() => router.push('/ticket/create-ticket')}>Finalizar Ticket</Button>
                </div>

                <div className='view-tickets__header__container'>
                    <div className='view-tickets__header__container__breadcrumbs'>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Typography color="text.primary">HelpDesk</Typography>
                            <Link underline="hover" color="inherit" onClick={() => router.push('/create-ticket')}>
                                Tickets
                            </Link>
                            <Typography color="text.primary">Ver ticket</Typography>
                        </Breadcrumbs>
                    </div>
                </div>

                <div className='view-tickets__header__info'> 
                    <Typography color="text.primary">Descripción: Esta es lsdivjsubvab jahsbc nf vhasdfhaefohzdvashdiuv dfiuv dpiuviuhvep ohgdpiuhvsdfiugsdf liuvsd iufhvs dfiuh sfibug ldiughseriugh siur ghoduigapsñoudig dsiugd siug </Typography>
                    <div>IMAGE</div>

                    <hr />

                    <Typography color="text">Creado en: </Typography>
                    <Typography color="text.primary">Respuestas: </Typography>
                    <Typography color="text.primary">Ultima respuesta: </Typography>
                </div>
            </div>
            
            <div className='view-tickets__content'>
                <div className='view-tickets__content__messages'>
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                    <AdminMessage />
                    <ClientMessage />
                </div>
            </div>

            <div className='view-tickets__content__input-container'>
                <TextField className='view-tickets__content__input-container__input' id="outlined" label="Escribe algo..." />    
                <IconButton aria-label="send" size="large">
                    <FileUploadOutlinedIcon fontSize="large" />
                    <input type="file" name="myfile" className='view-tickets__content__input-container__file' />
                </IconButton>
                <IconButton aria-label="send" size="large">
                    <NearMeOutlinedIcon fontSize="large" />
                </IconButton>
                <IconButton aria-label="send" size="large">
                    <ReplayOutlinedIcon fontSize="medium" />
                </IconButton>
            </div>
        </div>
    )
}