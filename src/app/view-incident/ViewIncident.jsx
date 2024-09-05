'use client'
import './viewIncident.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Breadcrumbs, Link, Typography, TextField, Grid, List, ListItem, ListItemIcon } from "@mui/material";
import { useRouter, useSearchParams } from 'next/navigation';
import { getIncidentInfo, updateIncident } from '@/redux/actions/incidenteActions';
import { selectIncidenteInfo, selectIncidentFiles } from '@/redux/reducers/incidenteReducer';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';
import html2pdf from 'html2pdf.js';
import { showSnackbar } from '@/redux/actions/visualsAction';

const ViewIncident = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const incidentId = searchParams.get('incidentId');
    const dispatch = useDispatch();
    const incidente = useSelector(selectIncidenteInfo);
    const incidentFiles = useSelector(selectIncidentFiles);

    const [tipoIncidenteName, setTipoIncidenteName] = useState("");
    const [prioridad, setPrioridad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [puesto, setPuesto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [acciones, setAcciones] = useState("");
    const [personas, setPersonas] = useState("");
    const [detalles, setDetalles] = useState("");
    const [adicionales, setAdicionales] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [usuarioNombre, setUsuarioNombre] = useState("");
    const [usuarioEmail, setUsuarioEmail] = useState("");
    const [fecha, setFecha] = useState("");

    useEffect(() => {
        if (incidentId) {
            dispatch(getIncidentInfo(incidentId));
        }
    }, [dispatch, incidentId]);

    useEffect(() => {
        if (incidente) {
            setTipoIncidenteName(incidente.tipoIncidente_detail?.name || "N/A");
            setPrioridad(incidente.tipoIncidente_detail?.prioridad?.name || "N/A");
            setTelefono(incidente.user?.telefono || "");
            setPuesto(incidente.puesto || "");
            setDescripcion(incidente.descripcion || "");
            setAcciones(incidente.acciones || "");
            setPersonas(incidente.personas || "");
            setDetalles(incidente.detalles || "");
            setAdicionales(incidente.adicionales || "");
            setEmpresa(incidente.user?.empresa?.nombre);
            setUsuarioNombre(`${incidente.user?.firstName} ${incidente.user?.lastName}`);
            setUsuarioEmail(incidente.user?.email);
            setFecha(new Date(incidente.created_at).toLocaleString());
        }
    }, [incidente]);

    const handleSaveChanges = async () => {
        const updatedIncident = {
            acciones,
            personas,
            detalles,
            adicionales,
        };
        const { incidentUpdatedSuccessfully } = await dispatch(updateIncident(incidentId, updatedIncident));
        if (incidentUpdatedSuccessfully) {
            router.push(`/incidents/`);
        } else {
            console.error("Error updating incident");
        }
    };

    const handleGeneratePDF = () => {
        const input = document.getElementById('incident-info');
        
        // Cargar el logo desde la carpeta public
        const logo = new Image();
        logo.src = '/LogoNegro.png';
    
        logo.onload = () => {
            html2canvas(input, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
                
                // Agregar título y logo
                pdf.setFontSize(20);
                pdf.text('Incidente de Seguridad', pdfWidth / 2, 20, { align: 'center' });
                pdf.addImage(logo, 'PNG', 10, 10, 20, 20); // Ajusta la posición y el tamaño según tus necesidades
                
                const imgProps = pdf.getImageProperties(imgData);
                const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
                pdf.addImage(imgData, 'PNG', 0, 40, pdfWidth, imgHeight);
                pdf.save(`Incidente_${incidentId}.pdf`);
                
                dispatch(showSnackbar('El PDF se ha generado correctamente.', 'success'));
            }).catch(error => {
                console.error('Error al generar el PDF:', error);
                dispatch(showSnackbar('Hubo un problema al generar el PDF.', 'error'));
            });
        };
    
        logo.onerror = () => {
            console.error('Error al cargar el logo.');
            dispatch(showSnackbar('No se pudo cargar el logo para el PDF.', 'error'));
        };
    };

    // const handleGeneratePDF = () => {
    //     const incidentInfo = document.getElementById('incident-info');
    //     const attachedFiles = document.querySelectorAll('.view-incident__content__section__images img'); // Seleccionar todas las imágenes adjuntas
    
    //     // Cargar el logo desde la carpeta public
    //     const logo = new Image();
    //     logo.src = '/LogoNegro.png';
    
    //     logo.onload = async () => {
    //         const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size in mm
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
            
    //         // Agregar el logo y el título en la primera página
    //         pdf.setFontSize(20);
    //         pdf.text('Incidente de Seguridad', pdfWidth / 2, 20, { align: 'center' });
    //         pdf.addImage(logo, 'PNG', 10, 10, 20, 20); 
    
    //         // Renderizar la información del incidente en canvas
    //         await html2canvas(incidentInfo, { scale: 2 }).then(canvas => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const imgProps = pdf.getImageProperties(imgData);
    //             const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
                
    //             // Agregar la primera sección de contenido debajo del logo
    //             pdf.addImage(imgData, 'PNG', 0, 40, pdfWidth, imgHeight);
    //         });
    
    //         // Para agregar las imágenes adjuntas, creamos una nueva página para cada imagen si es necesario
    //         for (let i = 0; i < attachedFiles.length; i++) {
    //             if (i > 0) {
    //                 pdf.addPage();
    //             }
                
    //             const imageCanvas = await html2canvas(attachedFiles[i], { scale: 2 });
    //             const imageData = imageCanvas.toDataURL('image/png');
    //             const imageProps = pdf.getImageProperties(imageData);
    //             const imageHeight = (imageProps.height * pdfWidth) / imageProps.width;
                
    //             // Agregar la imagen adjunta
    //             pdf.addImage(imageData, 'PNG', 0, 40, pdfWidth, imageHeight);
    //         }
    
    //         // Guardar el PDF
    //         pdf.save(`Incidente_${incidentId}.pdf`);
    //         dispatch(showSnackbar('El PDF se ha generado correctamente.', 'success'));
    //     };
    
    //     logo.onerror = () => {
    //         console.error('Error al cargar el logo.');
    //         dispatch(showSnackbar('No se pudo cargar el logo para el PDF.', 'error'));
    //     };
    // };
    
    return (
        <div className='view-incident'>
            <div className='view-incident__header'>
                <div className="view-incident__header__title">
                    <h1>Ver/Editar Incidente</h1>
                </div>
                <div className='view-incident__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push('/incidents/')}>
                            Incidentes
                        </Link>
                        <Typography color="text.primary">Ver/Editar</Typography>
                    </Breadcrumbs>
                </div>
                <div className='view-incident__header__button'>
                    <Button className='view-incident__header__button__cancel' onClick={() => router.push(`/incidents/`)}>
                        Regresar
                    </Button>
                    <Button className='view-incident__header__button__save' onClick={handleSaveChanges}>
                        Guardar Cambios
                    </Button>
                </div>
                <div className='view-incident__header__button__pdf'>
                    <Button variant="outlined" className='view-incident__content__section__button__pdf' onClick={handleGeneratePDF}>
                        Generar PDF
                    </Button>
                </div>
            </div>
            <div id='incident-info' className='view-incident__content'>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Información del Incidente</Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Fecha y Hora del Incidente"
                                    value={fecha}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Nivel de gravedad"
                                    value={prioridad}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Nombre de la Empresa"
                                    value={empresa}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Nombre Completo del Usuario"
                                    value={usuarioNombre}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Correo Electrónico del Usuario"
                                    value={usuarioEmail}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Número de Teléfono"
                                    value={telefono}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Área/Puesto"
                                    value={puesto}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Tipo de Incidente"
                                    value={tipoIncidenteName}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className='view-incident__content__section__field readonly-field'>
                                <TextField
                                    fullWidth
                                    label="Descripción del incidente"
                                    value={descripcion}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Acciones Tomadas</Typography>
                    <br />
                    <div className='view-incident__content__section__field'>
                        <TextField
                            fullWidth
                            label="Acciones Tomadas"
                            value={acciones}
                            onChange={(e) => setAcciones(e.target.value)}
                            multiline
                            rows={4}
                        />
                    </div>
                </div>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Personas Involucradas</Typography>
                    <br />
                    <div className='view-incident__content__section__field'>
                        <TextField
                            fullWidth
                            label="Personas Involucradas"
                            value={personas}
                            onChange={(e) => setPersonas(e.target.value)}
                            multiline
                            rows={2}
                        />
                    </div>
                </div>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Otros detalles relevantes</Typography>
                    <br />
                    <div className='view-incident__content__section__field'>
                        <TextField
                            fullWidth
                            label="Otros detalles relevantes"
                            value={detalles}
                            onChange={(e) => setDetalles(e.target.value)}
                            multiline
                            rows={2}
                        />
                    </div>
                </div>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Acciones adicionales</Typography>
                    <br />
                    <div className='view-incident__content__section__field'>
                        <TextField
                            fullWidth
                            label="Acciones adicionales"
                            value={adicionales}
                            onChange={(e) => setAdicionales(e.target.value)}
                            multiline
                            rows={2}
                        />
                    </div>
                </div>
                <div className='view-incident__content__section'>
                    <Typography variant="h4">Archivos Adjuntos</Typography>
                    <br />
                    <div className='view-incident__content__section__images'>
                        {incidentFiles.length > 0 ? (
                            incidentFiles.map((archivo) => (
                                <img
                                    key={archivo.id}
                                    src={archivo.url}
                                    alt={`Archivo ${archivo.id}`}
                                    style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
                                    onClick={() => window.open(archivo.url, '_blank')}
                                />
                            ))
                        ) : (
                            <p>Sin evidencia para mostrar</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewIncident;
