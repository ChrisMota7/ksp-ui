import { get, post, put } from "@/utils/api"
import { SET_CATEGORIES, SET_DASHBOARD, ADD_PROBLEM, SET_CATEGORIES_ALL} from "../reducers/categoryReducer"

export const getCategoriesAll = () => async (dispatch) => {
    try {
        const categories = await get('/helpdesk/categorias/')

        dispatch({
            type: SET_CATEGORIES_ALL,
            payload: categories
        })

        return { setCategoryTableSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { setCategoryTableSuccessfully: false }
    }
}

export const getProblems = () => async (dispatch) => {
    try {
        const categories = await get('/helpdesk/problemas/')

        console.log("categories",categories)

        dispatch({
            type: SET_CATEGORIES,
            payload: categories
        })

        return { setCategoryTableSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { setCategoryTableSuccessfully: false }
    }
}

export const createProblem = (name, categoria_id, prioridad_id) => async (dispatch) => {

    const body = new FormData()
    body.append('name', name)
    body.append('categoria', categoria_id)
    body.append('prioridad', prioridad_id)

    try {
        const response = await post("/helpdesk/problemas/", body, {
        })

        console.log("response",response)

        return { problemCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { problemCreatedSuccessfully: false }
    }
}

export const createCategorie = (name) => async (dispatch) => {

    const body = new FormData()
    body.append('name', name)

    try {
        const response = await post("/helpdesk/categorias/crear/", body, {
        })

        console.log("response",response)

        return { categorieCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { categorieCreatedSuccessfully: false }
    }
}

export const updateProblem = (categoryId, categoryName) => async (dispatch) => {
    try {
        const response = await put(`/helpdesk/problems/${categoryId}/update/`, 
        { 
            name: categoryName 
        })

        return { setUpdateCategerySuccess: true }
    } catch (e) {
        console.log("error", e)

        return { setUpdateCategerySuccess: false }
    }
}

export const deleteProblem = (categoryId) => async (dispatch) => {
    try {
        await put(`/helpdesk/problems/${categoryId}/delete/`);

        return { setDeleteCategerySuccess: true }
    } catch (e) {
        console.log("error", e)

        return { setDeleteCategerySuccess: false }
    }
}

export const getDashboard = () => async (dispatch) => {
    try {
        const dashboard = await get("/helpdesk/stats/tickets/");

        console.log("datos dashboard", dashboard)
        dispatch({
            type: SET_DASHBOARD,
            payload: dashboard
        })
        return { setDashboardSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { setDashboardSuccessfully: false }
    }
}

export const updateCategories = (categoryId, categoryName) => async (dispatch) => {
    try {
        const response = await put(`/helpdesk/categories/${categoryId}/update/`, 
        { 
            name: categoryName 
        })
        return { setUpdateCategerySuccess: true }
    } catch (e) {
        console.log("error", e)
        return { setUpdateCategerySuccess: false }
    }
}

export const deleteCategories = (categoryId) => async (dispatch) => {
    try {
        await put(`/helpdesk/categories/${categoryId}/delete/`)
        return { setDeleteCategerySuccess: true }
    } catch (e) {
        console.log("error", e)
        return { setDeleteCategerySuccess: false }
    }
}