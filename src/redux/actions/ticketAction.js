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
    // const isAdmin = "false"
    // const userId = 2
    const isAdmin = localStorage.getItem("isAdmin")
    const userId = localStorage.getItem("userid")

    try{
        const ticketsTable = await get('/helpdesk/tickets/table/')
        
        // const ticketsTable = [
        //     {
        //         asunto:  "asunto 1",
        //         created_at: "2024-04-28T05:30:42.136946Z",
        //         descripcion: "aaaaa",
        //         id: 1,
        //         prioridad: null,
        //         problema: {id: 1, name: 'Administrar equipos', isDeleted: '0', categoria: 1},
        //         status: "0",
        //         user: {
        //             id: 1, 
        //             firstName: 'Christian', 
        //             lastName: 'López', 
        //             email: 'chris@ksp.com.mx', 
        //             isDeleted: '0', 
        //             createdAt: "2024-04-28T05:28:59.163412Z",
        //             isAdmin: "0"
        //         }
        //     },
        //     {
        //         asunto: "Prueba 1 crear ticket",
        //         created_at: "2024-04-28T05:30:51.042209Z",
        //         descripcion: "desc 1",
        //         id: 2,
        //         prioridad: null,
        //         problema: {id: 2, name: 'Administrar cuentas', isDeleted: '0', categoria: 2},
        //         status: "0",
        //         user: {
        //             id: 2, 
        //             firstName: 'prueba', 
        //             lastName: 'López', 
        //             email: 'isra', 
        //             isDeleted: '0', 
        //             createdAt: "2024-04-28T05:28:59.163412Z",
        //             isAdmin: "0"
        //         }
        //     }
        // ]

        let filteredTickets
        if (isAdmin === "false") {
            filteredTickets = ticketsTable.filter((ticket) => {
                return ticket.user.id === userId
            })
        } else {
            filteredTickets = ticketsTable
        }

        console.log("filteredTickets",filteredTickets)
        dispatch({
            type: SET_TICKETS_TABLE,
            payload: filteredTickets
        })
        dispatch({
            type: SET_TICKETS_DUPLICATION,
            payload: filteredTickets
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

