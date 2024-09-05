// reducers/empresaReducer.js
export const SET_EMPRESAS = "SET_EMPRESAS";
export const SET_EMPRESAS_ALL = "SET_EMPRESAS_ALL";

export const defaultState = {
    empresasAll: [],
    empresas: [],
};

const empresaReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_EMPRESAS_ALL:
            console.log("Reducer SET_EMPRESAS_ALL:", action.payload);
            return {
                ...state,
                empresasAll: action.payload
            };
        case SET_EMPRESAS:
            console.log("Reducer SET_EMPRESAS:", action.payload);
            return {
                ...state,
                empresas: action.payload || []
            };
        default:
            return state;
    }
};

export default empresaReducer;

export const selectEmpresas = (state) => state.empresaReducer.empresas;
export const selectEmpresasAll = (state) => state.empresaReducer.empresasAll;
