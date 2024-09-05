'use client'
import './CreateIncident.scss'
import React, { useEffect } from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Breadcrumbs, Link, Typography, Button, FormHelperText, Input } from "@mui/material"
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createIncident, getTipoIncidentes } from '@/redux/actions/incidenteActions';
import { selectTipoIncidentes } from '@/redux/reducers/incidenteReducer';

const CreateIncident = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const tiposIncidentes = useSelector(selectTipoIncidentes);
    
    const [tipoIncidenteId, setTipoIncidenteId] = useState("");
    const [puesto, setPuesto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [acciones, setAcciones] = useState("");
    const [personas, setPersonas] = useState("");
    const [detalles, setDetalles] = useState("");
    const [adicionales, setAdicionales] = useState("");
    const [archivos, setArchivos] = useState([]);

    useEffect(() => {
        dispatch(getTipoIncidentes());
    }, [dispatch]);

    const handleArchivoChange = (e) => {
        setArchivos(Array.from(e.target.files));
    };

    const submitCreateIncident = async (e) => {
        e.preventDefault();
        const { newIncidentId, incidentCreatedSuccessfully } = await dispatch(createIncident(
            tipoIncidenteId, 
            puesto, 
            descripcion, 
            acciones, 
            personas, 
            detalles, 
            adicionales,
            archivos
        ));
    
        if (incidentCreatedSuccessfully) {
            router.push(`/view-incident/?incidentId=${newIncidentId}`);
        } else {
            console.error("Error creating incident");
        }
    };

    const tiposIncidentesActivos = tiposIncidentes.filter(tipo => tipo.isDeleted === "0");

    return (
        <div className='create-incident'>
            <div className='create-incident__header'>
                <div className='create-incident__header__title'>
                    <h1>Nuevo Incidente</h1>
                </div>
    
                <div className='create-incident__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/incidents/')}>
                            Incidentes
                        </Link>
                        <Typography color="text.primary">Nuevo</Typography>
                    </Breadcrumbs>
                </div>
            </div>
    
            <form onSubmit={submitCreateIncident} className='create-incident__content'>
                <h4 className='create-incident__content__title'>Información del Incidente</h4>
                <div className='create-incident__content__top'>
                    <FormControl className='create-incident__content__top__select' required>
                        <InputLabel id="select-label">Tipo de incidente</InputLabel>
                        <Select
                            value={tipoIncidenteId}
                            labelId="select-label"
                            id="select"
                            label="¿Qué incidente de seguridad quieres reportar?"
                            onChange={event => setTipoIncidenteId(event.target.value)}
                        >
                            {tiposIncidentesActivos.map((tipo) => (
                                <MenuItem key={tipo.id} value={tipo.id}>
                                    {tipo.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className='create-incident__content__top__input'>
                        <TextField
                            value={puesto}
                            required
                            name='Area/Puesto'
                            type='text'
                            onChange={event => setPuesto(event.target.value)}
                            id="outlined-basic"
                            label="Área/Puesto"
                        />
                    </FormControl>
                </div>
    
                <div className='create-incident__content__bottom'>
                    <p>
                        Proporciona una descripción detallada del incidente de seguridad, incluyendo lo siguiente:
                        Tipo de incidente (por ejemplo, brecha de datos, malware, acceso no autorizado, robo de información, etc.)
                        Cómo se descubrió el incidente
                        Actividades sospechosas o anormales relacionadas con el incidente
                        Recursos afectados (sistemas, redes, datos, etc.)
                        Impacto potencial del incidente
                    </p>
                    <FormControl fullWidth className='create-incident__content__bottom__descripcion'>
                        <TextField
                            onChange={event => setDescripcion(event.target.value)}
                            value={descripcion}
                            required
                            name='descripcion'
                            id="outlined-basic"
                            label="Descripción del incidente"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={4}
                        />
                        <FormHelperText className='char-counter'>{descripcion.length}/250</FormHelperText>
                    </FormControl>
    
                    <FormControl fullWidth className='create-incident__content__bottom__acciones'>
                        <p>Enumera las acciones que se hayan tomado hasta el momento en respuesta al incidente</p>
                        <TextField
                            onChange={event => setAcciones(event.target.value)}
                            value={acciones}
                            name='acciones'
                            id="outlined-basic"
                            label="Acciones Tomadas"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={4}
                        />
                    </FormControl>
    
                    <FormControl fullWidth className='create-incident__content__bottom__personas'>
                        <p>Coloca Nombre y Correo de los involucrados Ej. Juan Perez Cerda (juan.cerda@ksp.com.mx)</p>
                        <TextField
                            onChange={event => setPersonas(event.target.value)}
                            value={personas}
                            name='personas'
                            id="outlined-basic"
                            label="Personas Involucradas"
                            multiline
                            rows={2}
                        />
                    </FormControl>
    
                    <FormControl fullWidth className='create-incident__content__bottom__detalles'>
                        <TextField
                            onChange={event => setDetalles(event.target.value)}
                            value={detalles}
                            name='detalles'
                            id="outlined-basic"
                            label="Otros detalles relevantes"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={2}
                        />
                    </FormControl>
    
                    <FormControl fullWidth className='create-incident__content__bottom__adicionales'>
                        <TextField
                            onChange={event => setAdicionales(event.target.value)}
                            value={adicionales}
                            name='adicionales'
                            id="outlined-basic"
                            label="Acciones adicionales"
                            inputProps={{ maxLength: 250 }}
                            multiline
                            rows={2}
                        />
                    </FormControl>

                    <FormControl fullWidth className='create-incident__content__bottom__archivos'>
                        <Input
                            type="file"
                            inputProps={{ multiple: true }}
                            onChange={handleArchivoChange}
                        />
                        <FormHelperText>Adjunta archivos relacionados con el incidente (opcional)</FormHelperText>
                    </FormControl>
    
                    <div className='create-incident__content__bottom__button'>
                        <Button className='create-incident__content__bottom__button__cancel' onClick={() => router.push(`/incidents/`)} variant="contained">
                            Cancelar
                        </Button>
                        <Button className='create-incident__content__bottom__button__create' type='submit' variant="contained">
                            Enviar Incidente
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateIncident;
