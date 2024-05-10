import { get, post } from "@/utils/api"
import { SET_CATEGORIES, SET_DASHBOARD, ADD_PROBLEM } from "../reducers/categoryReducer"

export const getCategories = () => async (dispatch) => {
    try {
        const categories = await get('/helpdesk/problemas/')

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

        return { ticketCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { ticketCreatedSuccessfully: false }
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
