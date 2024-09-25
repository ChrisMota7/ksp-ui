'use client'
import './CreateTicket.scss'
import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Breadcrumbs, Link, Typography, Button, FormHelperText, Input } from "@mui/material"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createTicket, getProblems } from '@/redux/actions/ticketAction';
import { selectProblems } from '@/redux/reducers/ticketReducer';
import { getCategoriesAll } from '@/redux/actions/categoryActions';
import { selectCategoriesAll } from '@/redux/reducers/categoryReducer';
import { showSnackbar } from '@/redux/actions/visualsAction';

const CreateTicket = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const possibleProblems = useSelector(selectProblems);
    const categories = useSelector(selectCategoriesAll);

    const [asunto, setAsunto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [problemaid, setProblemaid] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [files, setFiles] = useState([]); 
	const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(getCategoriesAll());
    }, [dispatch]);

    const submitCreateTicket = async (e) => {
        e.preventDefault();
		
		if (isSubmitting) return; // Evita múltiples envíos

        setIsSubmitting(true);
		
        const { newTicketId, ticketCreatedSuccessfully } = await dispatch(createTicket(asunto, descripcion, problemaid, files));

        if (ticketCreatedSuccessfully) {
            router.push(`/view-ticket/?ticketId=${newTicketId}`);
        }
    };

    const handleCategoryChange = async (event) => {
        const categoryId = event.target.value;
        setCategoria(categoryId);
        await dispatch(getProblems(categoryId));
    };

    const handleFileInputChange = (event) => {
        const selectedFiles = event.target.files;
        let allFiles = [...files]; // Mantén los archivos previamente seleccionados
        let tooLargeFiles = false;
        
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
    
            // Verificar el tipo de archivo y tamaño
            if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('application/')) {
                if (file.size > 5 * 1024 * 1024) {  // Limitar a 5MB
                    tooLargeFiles = true;
                } else if (allFiles.length < 5) {  // Limitar a 5 archivos
                    allFiles.push(file);
                } else {
                    console.warn("Solo puedes subir un máximo de 5 archivos.");
                    dispatch(showSnackbar("Solo puedes subir un máximo de 5 archivos", "error"));
                    break;  // Detenemos el bucle si ya alcanzamos el límite
                }
            }
        }
    
        if (tooLargeFiles) {
            dispatch(showSnackbar("Uno o más archivos exceden el tamaño máximo permitido de 5MB.", "error"));
        }
    
        setFiles(allFiles);
    };

    // Formato de tamaño de archivo
    const formatFileSize = (size) => {
        return size > 1024 * 1024
            ? `${(size / (1024 * 1024)).toFixed(2)} MB`
            : `${(size / 1024).toFixed(2)} KB`;
    };

    // Filtrar categorías activas
    const activeCategories = categories.filter(categoria => categoria.isDeleted === "0");

    // Filtrar problemas activos
    const activeProblems = possibleProblems.filter(problem => problem.isDeleted === "0");

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
                <h2 className='create-ticket__content__title'>Información básica</h2>
                <div className='create-ticket__content__top'>
                    <FormControl className='create-ticket__content__top__input'>
                        <TextField
                            value={asunto}
                            required
                            name='asunto'
                            type='text'
                            onChange={event => setAsunto(event.target.value)}
                            id="outlined-basic"
                            label="Asunto"
                            inputProps={{ maxLength: 50 }}
                        />
                        <FormHelperText className='char-counter'>{asunto.length}/50</FormHelperText>
                    </FormControl>

                    <FormControl className='create-ticket__content__top__select'>
                        <InputLabel id="select-label" required>Categoría</InputLabel>
                        <Select
                            value={categoria}
                            required
                            labelId="select-label"
                            id="select"
                            label="Categoría"
                            onChange={handleCategoryChange}
                        >
                            {activeCategories.map((categoria) => (
                                <MenuItem key={categoria.id} value={categoria.id}>
                                    {categoria.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className='create-ticket__content__bottom'>
                    <FormControl fullWidth className='create-ticket__content__bottom__tipoProblema'>
                        <InputLabel id="select-label" required>Tipo de problema</InputLabel>
                        <Select
                            onChange={event => setProblemaid(event.target.value)}
                            required
                            value={problemaid}
                            name='problema'
                            labelId="select-label"
                            id="select"
                            label="Tipo de problema"
                        >
                            {activeProblems?.map((problem) => (
                                <MenuItem key={problem.id} value={problem.id}>{problem.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth className='create-ticket__content__bottom__descripcion'>
                        <TextField
                            onChange={event => setDescripcion(event.target.value)}
                            value={descripcion}
                            required
                            name='descripcion'
                            id="outlined-basic"
                            label="Descripción del problema"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={4}
                        />
                        <FormHelperText className='char-counter'>{descripcion.length}/250</FormHelperText>
                    </FormControl>

                    <h2 className='create-ticket__content__bottom__title'>Evidencia (opcional)</h2>
                    <p>Solo se pueden subir máximo 5 imagenes o videos. Cada uno puede pesar máximo 5 MB.</p>

                    <FormControl fullWidth className='create-incident__content__bottom__archivos'>
                        <Input
                            type="file"
                            inputProps={{ multiple: true }}
                            onChange={handleFileInputChange}
                        />
                        <FormHelperText>Adjunta archivos relacionados con el ticket (opcional)</FormHelperText>
                    </FormControl>

                    {/* Lista de archivos seleccionados */}
                    <p>Lista de archivos seleccionados:</p>
                    {files.length > 0 && (
                        <ul>
                            {files.map((file, index) => (
                                <li key={index}>
                                    {file.name} - {formatFileSize(file.size)}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className='create-ticket__content__bottom__button-container'>
                        <Button className='create-ticket__content__bottom__button-container__cancel' onClick={() => router.push(`/tickets/`)} variant="contained">
                            Cancelar
                        </Button>
                        <Button className='create-ticket__content__bottom__button-container__sent' type='submit'  variant="contained" disabled={isSubmitting}>
							{isSubmitting ? 'Enviando...' : 'Enviar Ticket'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;
