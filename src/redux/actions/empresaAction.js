import { get, post, put } from "@/utils/api";
import { SET_EMPRESAS, SET_EMPRESAS_ALL } from "../reducers/empresaReducer";

export const getEmpresasAll = () => async (dispatch) => {
    try {
        const empresas = await get('/user/empresas/');
        dispatch({
            type: SET_EMPRESAS_ALL,
            payload: empresas
        });
        return { setEmpresaTableSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { setEmpresaTableSuccessfully: false };
    }
}

export const getEmpresasTable = () => async (dispatch) => {
    try {
        const empresas = await get('/user/empresas/table/');
        console.log("Acción getEmpresasTable - empresas:", empresas);
        dispatch({
            type: SET_EMPRESAS,
            payload: empresas,
        });
        return { setEmpresaTableSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { setEmpresaTableSuccessfully: false };
    }
};

export const createEmpresa = (nombre) => async (dispatch) => {
    const body = new FormData();
    body.append('nombre', nombre);

    try {
        const response = await post("/user/empresas/", body);
        return { empresaCreatedSuccessfully: true };
    } catch (e) {
        console.log("error", e);
        return { empresaCreatedSuccessfully: false };
    }
}

export const updateEmpresa = (empresaId, data) => async (dispatch) => {
    try {
        const response = await put(`/user/empresas/${empresaId}/`, data);
        return { setUpdateEmpresaSuccess: true };
    } catch (e) {
        console.log("error", e);
        return { setUpdateEmpresaSuccess: false };
    }
}

export const deleteEmpresa = (empresaId) => async (dispatch) => {
    try {
        await put(`/user/empresas/${empresaId}/delete/`);
        return { setDeleteEmpresaSuccess: true };
    } catch (e) {
        console.log("error", e);
        return { setDeleteEmpresaSuccess: false };
    }
}
