import { get, post, put } from "@/utils/api";
import { SET_TIPO_INCIDENTES, SET_INCIDENTES, SET_INCIDENTE_INFO, selectIncidenteInfo } from "../reducers/incidenteReducer";

export const getTipoIncidentes = () => async (dispatch) => {
    try {
        const tiposIncidentes = await get('/helpdesk/tipos-incidente/');
        dispatch({ type: SET_TIPO_INCIDENTES, payload: tiposIncidentes });
        return { setTipoIncidentesSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { setTipoIncidentesSuccessfully: false };
    }
};

export const createTipoIncident = (name, prioridadId) => async (dispatch) => {
    const body = { name, prioridad: prioridadId };
    try {
        const response = await post("/helpdesk/tipos-incidente/", body);
        return { tipoIncidentCreatedSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { tipoIncidentCreatedSuccessfully: false };
    }
};

export const updateTipoIncidente = (tipo_incidente_id, data) => async (dispatch) => {
    try {
        const response = await put(`/helpdesk/tipos-incidente/${tipo_incidente_id}/update/`, data);
        return { setUpdateTipoIncidenteSuccess: true };
    } catch (e) {
        console.log("error", e);
        return { setUpdateTipoIncidenteSuccess: false };
    }
};

export const deleteTipoIncidente = (id) => async (dispatch) => {
    try {
        await put(`/helpdesk/tipos-incidente/${id}/delete/`);
        return { setDeleteTipoIncidenteSuccess: true };
    } catch (e) {
        console.log("error", e);
        return { setDeleteTipoIncidenteSuccess: false };
    }
};

export const getIncidentes = () => async (dispatch) => {
    const isAdmin = localStorage.getItem("isAdmin");
    const userId = localStorage.getItem("userid");

    try {
        const incidentes = await get('/helpdesk/incidentes/');

        let filteredIncidentes;
        if (isAdmin === "false") {
            filteredIncidentes = incidentes.filter(incidente => incidente.user.id == userId && incidente.isDeleted === "0");
        } else {
            filteredIncidentes = incidentes.filter(incidente => incidente.isDeleted === "0");
        }

        dispatch({ type: SET_INCIDENTES, payload: filteredIncidentes });
        return { setIncidentesSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { setIncidentesSuccessfully: false };
    }
};

export const createIncident = (tipoIncidenteId, puesto, descripcion, acciones, personas, detalles, adicionales, archivos = []) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    const body = new FormData();
    body.append('tipoIncidente', tipoIncidenteId);
    body.append('puesto', puesto);
    body.append('descripcion', descripcion);
    body.append('acciones', acciones);
    body.append('personas', personas);
    body.append('detalles', detalles);
    body.append('adicionales', adicionales);

    archivos.forEach(archivo => {
        body.append('archivos', archivo); // Asegúrate de que cada archivo se adjunte
    });

    try {
        const response = await post("/helpdesk/incidentes/crear/", body, {
            Authorization: `Bearer ${accessToken}`,
        });

        console.log("response", response);

        const incidentId = response.id;

        return { incidentCreatedSuccessfully: true, newIncidentId: incidentId };
    } catch (e) {
        console.log("error", e);

        return { incidentCreatedSuccessfully: false, newIncidentId: undefined };
    }
};

export const deleteIncidente = (id) => async (dispatch) => {
    try {
        const response = await put(`/helpdesk/incidentes/${id}/delete/`);
        dispatch(getIncidentes());
        return { incidenteDeletedSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { incidenteDeletedSuccessfully: false };
    }
};

export const getIncidentInfo = (incidentId) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    let relatedFiles = [];
    try {
        relatedFiles = await get(`/helpdesk/incidentes/${incidentId}/archivos/`, {
            Authorization: `Bearer ${accessToken}`,
        });
    } catch (e) {
        console.log("Error al obtener archivos:", e);
    }

    try {
        const incidentInfo = await get(`/helpdesk/incidentes/${incidentId}/`, {
            Authorization: `Bearer ${accessToken}`,
        });

        console.log("Información del incidente:", incidentInfo);
        console.log("Archivos relacionados:", relatedFiles);

        dispatch({
            type: SET_INCIDENTE_INFO,
            payload: {
                incidenteInfo: incidentInfo,
                incidentFiles: relatedFiles,
            },
        });

        return { setIncidentInfoSuccessfully: true };
    } catch (e) {
        console.log("Error al obtener información del incidente:", e);

        return { setIncidentInfoSuccessfully: false };
    }
};

export const updateIncident = (incidentId, updatedIncident, archivos = []) => async (dispatch, getState) => {
    try {
        const state = getState();
        const incidente = selectIncidenteInfo(state);

        if (!incidente || !incidente.tipoIncidente) {
            throw new Error("tipoIncidente is undefined");
        }

        const body = new FormData();
        body.append('tipoIncidente', incidente.tipoIncidente);
        body.append('puesto', incidente.puesto);
        body.append('descripcion', incidente.descripcion);
        body.append('acciones', updatedIncident.acciones);
        body.append('personas', updatedIncident.personas);
        body.append('detalles', updatedIncident.detalles);
        body.append('adicionales', updatedIncident.adicionales);

        archivos.forEach(archivo => {
            body.append('archivos', archivo); // Asegúrate de que cada archivo se adjunte
        });

        await put(`/helpdesk/incidentes/${incidentId}/`, body);
        dispatch({ type: 'UPDATE_INCIDENT_SUCCESS' });
        return { incidentUpdatedSuccessfully: true };
    } catch (e) {
        console.error("Error updating incident", e);
        return { incidentUpdatedSuccessfully: false };
    }
};
