'use client'
import './Tickets.scss'
import React from 'react';
import { useState } from 'react';

import { TextField, FormControl, InputLabel, Select, MenuItem, Card, Button, Breadcrumbs, Link, Typography } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, getProblems } from '@/redux/actions/ticketAction';
import { selectProblems } from '@/redux/reducers/ticketReducer';
import { selectJWT, selectUserid } from '@/redux/reducers/authReducer';

const Tickets = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const possibleProblems = useSelector(selectProblems)

    const [asunto, setAsunto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [problemaid, setProblemaid] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [files, setFiles] = useState([]);

    const submitCreateTicket = (e) => {
        e.preventDefault();
        
        dispatch(createTicket(asunto, descripcion, problemaid, files))
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
      <div className='tickets'>
        <div className='tickets__title'>
            <h1>Nuevo Ticket</h1>
        </div>
        
        <div className='tickets__nav'>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={() => router.push('/ticket')}>
                    Tickets
                </Link>
                <Typography color="text.primary">Nuevo</Typography>
            </Breadcrumbs>
        </div>
        <div className='content'>
            <form onSubmit={submitCreateTicket}>
                <Card className='content__card'>
                    <h4 className='content__text'>Información básica</h4>
                    <div className='content__column'>
                        <div className='content__division'> 
                            <div className='content__label'>
                                <TextField 
                                value={asunto} name='asunto' type='text' 
                                onChange={event => setAsunto(event.target.value)}
                                className='content__label' 
                                id="outlined-basic" 
                                label="Asunto" />    
                            </div>
                            <div fullWidth className='content__label__select'>
                                <FormControl fullWidth className='content__label__select'>
                                    <InputLabel id="select-label">Categoría</InputLabel>
                                        <Select 
                                        value={categoria} name='categoria'
                                        // onChange={event => setCategoria(event.target.value)}
                                        labelId="select-label"
                                        id="select"
                                        label="categoria"
                                        onChange={handleCategoryChange}
                                        >
                                            <MenuItem value={1}>Hardware</MenuItem>
                                            <MenuItem value={2}>Software</MenuItem>
                                        </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div  className='content__tipoProblema'>
                            <FormControl fullWidth className='content__tipoProblema'>
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
                        </div>
                        <div className='content__Descripcion'>
                            <TextField 
                            onChange={event => setDescripcion(event.target.value)}
                            value={descripcion} name='descripcion' 
                            className='content__Descripcion' 
                            id="outlined-basic" 
                            label="Descripción del problema"/>
                        </div>
                        
                    </div>
                </Card>
                <Card>
                    <div className='content__evidencia'>
                        <h4 className='content__evidencia__title'>Evidencia</h4>
                        <div>
                            <input 
                                type="file" 
                                accept="image/* video/*" 
                                multiple 
                                onChange={handleFileInputChange}/>
                        </div>
                        <div className='content__evidencia__button__Save'>
                            <Button type='submit' className='content__evidencia__buttonSave' variant="contained" >Guardar Ticket</Button>
                        </div>
                    </div>
                </Card>
            </form>    
        </div>
    </div>
    );
};

export default Tickets;