import { get, post } from "@/utils/api"
import { SET_CATEGORIES, ADD_PROBLEM } from "../reducers/categoryReducer"

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

export const createProblem = (name, categoria_id) => async (dispatch) => {

    const body = new FormData()
    body.append('name', name)
    body.append('categoria', categoria_id)

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
