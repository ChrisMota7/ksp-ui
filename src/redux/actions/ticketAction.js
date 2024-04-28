import { get, post } from "@/utils/api"
import { SET_PROBLEMS, SET_TICKETS_DUPLICATION, SET_TICKETS_TABLE, SET_STATUS, selectTicketsDuplication } from "../reducers/ticketReducer"

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

export const getTableTickets = () => async (dispatch) => {
    try{
        const ticketsTable = await get('/helpdesk/tickets/table/')

        dispatch({
            type: SET_TICKETS_TABLE,
            payload: ticketsTable
        })
        dispatch({
            type: SET_TICKETS_DUPLICATION,
            payload: ticketsTable
        })

        return { setTicketsTableSuccessfully: true}
    } catch (e) {
        console.log("error", e)

        return {setTicketsTableSuccessfully: false}
    }
}

export const getVerTickets = () => async (dispatch) => {
    try{
        const ticketsTable = await get('/helpdesk/tickets/<int:ticket_id>/')

        dispatch({
            type: SET_TICKETS_TABLE,
            payload: ticketsTable
        })

        return { setTicketsTableSuccessfully: true}
    } catch (e) {
        console.log("error", e)

        return {setTicketsTableSuccessfully: false}
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

export const searchTicketByInfo = (searchWord) => async (dispatch, getState) => {
    const curentTickets = selectTicketsDuplication(getState())

    console.log("curentTickets",curentTickets)
    console.log("searchWord",searchWord)

    console.log("aaaa", curentTickets.map((ticket) => ticket.id))

    const searchedTickets = curentTickets.filter((ticket) => 
        ticket.id == searchWord ||
        ticket.asunto.includes(searchWord) ||
        ticket.user.email.includes(searchWord) ||
        //todo: filtrar por fecha
        ticket.created_at.includes(searchWord)
    )

    console.log("searchedTickets",searchedTickets)

    dispatch({
        type: SET_TICKETS_TABLE,
        payload: searchedTickets
    })

    return { setTicketsTableSuccessfully: true}
}

