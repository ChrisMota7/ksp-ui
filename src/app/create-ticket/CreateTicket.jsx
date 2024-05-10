'use client'
import './CreateTicket.scss'
import React from 'react';
import { useState } from 'react';

import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Button, Breadcrumbs, Link, Typography } from "@mui/material"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, getProblems } from '@/redux/actions/ticketAction';
import { selectProblems } from '@/redux/reducers/ticketReducer';

const CreateTicket = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const possibleProblems = useSelector(selectProblems)

    const [asunto, setAsunto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [problemaid, setProblemaid] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [files, setFiles] = useState([]);

    console.log("files", files)

    const submitCreateTicket = async (e) => {
        e.preventDefault();
        
        const { newTicketId, ticketCreatedSuccessfully } = await dispatch(createTicket(asunto, descripcion, problemaid, files))

        if (ticketCreatedSuccessfully) {
            router.push(`/view-ticket/?ticketId=${newTicketId}`)
        }
    }

    const handleCategoryChange = async (event) => {
        const categoryId = event.target.value

        setCategoria(categoryId)

        const { setProblemsSuccessfully } = await dispatch(getProblems(categoryId))
    }

    const handleFileInputChange = (event) => {
        const selectedFiles = event.target.files
        const allFiles = []
        for (let i = 0; i < selectedFiles.length; i++) {
            let file = selectedFiles.item(i)
            console.log(file.name)
            allFiles.push(file)
        }
        setFiles(allFiles)
    }

    return (        
        <div className='create-ticket'>
            <div className='create-ticket__header__title'>
                <h1>Nuevo Ticket</h1>
            </div>
            
            <div className='create-ticket__header__nav'>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" onClick={() => router.push('/tickets/')}>
                        Tickets
                    </Link>
                    <Typography color="text.primary">Nuevo</Typography>
                </Breadcrumbs>
            </div>

            <form onSubmit={submitCreateTicket} className='create-ticket__content'>
                <h4 className='create-ticket__content__title'>Información básica</h4>

                <div className='create-ticket__content__top'> 
                    <TextField 
                        value={asunto} 
                        name='asunto' 
                        type='text' 
                        onChange={event => setAsunto(event.target.value)}
                        className='create-ticket__content__top__input' 
                        id="outlined-basic" 
                        label="Asunto" 
                    />    
                    
                    <FormControl className='create-ticket__content__top__select'>
                        <InputLabel id="select-label">Categoría</InputLabel>
                            <Select 
                                value={categoria} 
                                name='categoria'
                                labelId="select-label"
                                id="select"
                                label="categoria"
                                onChange={handleCategoryChange}
                            >
                                <MenuItem value={1}>Hardware</MenuItem>
                                <MenuItem value={2}>Software</MenuItem>
                                <MenuItem value={3}>Logística</MenuItem>
                            </Select>
                    </FormControl>
                </div>

                <div className='create-ticket__content__bottom'>
                    <FormControl fullWidth className='create-ticket__content__bottom__tipoProblema'>
                        <InputLabel  id="select-label">Tipo de problema</InputLabel>
                        <Select 
                            onChange={event => setProblemaid(event.target.value)}
                            value={problemaid} name='problema'
                            labelId="select-label"
                            id="select"
                            label="Tipo de problema"
                        >
                            {possibleProblems?.map((problem) => {
                                return(
                                    <MenuItem key={problem.id} value={problem.id}>{problem.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>

                    <TextField 
                    onChange={event => setDescripcion(event.target.value)}
                    value={descripcion} name='descripcion' 
                    className='create-ticket__content__bottom__descripcion' 
                    id="outlined-basic" 
                    label="Descripción del problema"/>
                        
                    <h4 className='create-ticket__content__bottom__title'>Evidencia</h4>

                    <input 
                        type="file" 
                        accept="image/* video/*" 
                        multiple 
                        onChange={handleFileInputChange}
                    />

                    <div className='create-ticket__content__bottom__button-container'>
                        <Button 
                            type='submit' 
                            variant="contained" 
                        >
                            Enviar Ticket
                        </Button>
                    </div>
                </div>
            </form>    
        </div>
    );
};

export default CreateTicket;