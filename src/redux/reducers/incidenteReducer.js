export const SET_TIPO_INCIDENTES = "SET_TIPO_INCIDENTES";
export const SET_INCIDENTES = "SET_INCIDENTES";
export const SET_INCIDENTE_INFO = "SET_INCIDENTE_INFO";

export const defaultState = {
    tiposIncidentes: [],
    incidentes: [],
    incidentFiles: [],
    incidenteInfo: null,
};

const incidenteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_TIPO_INCIDENTES:
            return { ...state, tiposIncidentes: action.payload };
        case SET_INCIDENTES:
            return { ...state, incidentes: action.payload };
        case SET_INCIDENTE_INFO:
            return { ...state, 
                incidenteInfo: action.payload.incidenteInfo, 
                incidentFiles: action.payload.incidentFiles 
            };
        default:
            return state;
    }
};

export default incidenteReducer;

export const selectTipoIncidentes = (state) => state.incidenteReducer.tiposIncidentes;
export const selectIncidentes = (state) => state.incidenteReducer.incidentes;
export const selectIncidenteInfo = (state) => state.incidenteReducer.incidenteInfo;
export const selectIncidentFiles = (state) => state.incidenteReducer.incidentFiles;
