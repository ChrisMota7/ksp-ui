import { get, post } from "@/utils/api"
import { SET_PROBLEMS } from "../reducers/ticketReducer"

export const getProblems = (categoryId) => async (dispatch) => {
    try {
        const problems = await get(`/helpdesk/getProblemByCategory/${categoryId}`)

        dispatch({
            type: SET_PROBLEMS,
            payload: problems
        })

        return { setProblemsSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { setProblemsSuccessfully: false }
    } 
}

export const createTicket = (asunto, descripcion, problemaid, files) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    const body = new FormData()
    body.append('asunto', asunto)
    body.append('descripcion', descripcion)
    body.append('problema', problemaid)

    files.map((file) => {
        body.append('archivos', file, file.name)
    })
    try {
        const response = await post("/helpdesk/tickets/crear/", body, {
            Authorization: `Bearer ${accessToken}`,
        })

        console.log("response",response)

        return { ticketCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { ticketCreatedSuccessfully: false }
    }
}