import { get, post, put } from "@/utils/api"
import { SET_PROBLEMS, SET_PRIORIDAD, SET_TICKETS_DUPLICATION, SET_TICKETS_TABLE, SET_TICKET_INFO, selectTicketsDuplication, SET_MESSAGES, selectTicketMessages } from "../reducers/ticketReducer"

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

        console.log("isAdmin", isAdmin)
        console.log("userId", userId)

        let filteredTickets
        if (isAdmin === "false") {
            console.log("holaaaaaa", ticketsTable)
            filteredTickets = ticketsTable.filter((ticket) => {
                return ticket.user.id == userId
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

export const getTicketInfo = (ticketid) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    let relatedFiles = []
    try {
        relatedFiles = await get(`/helpdesk/tickets/${ticketid}/archivos/`, {
            Authorization: `Bearer ${accessToken}`,
        })
    } catch (e) {
        console.log("error",e)
    }

    try{
        const ticketInfo = await get(`/helpdesk/tickets/${ticketid}/`, {
            Authorization: `Bearer ${accessToken}`,
        })

        const messages = await get(`/helpdesk/tickets/${ticketid}/mensajes/`, {
            Authorization: `Bearer ${accessToken}`,
        })

        console.log("ticketInfo",ticketInfo)
        console.log("messages",messages)
        console.log("relatedFiles",relatedFiles)

        dispatch({
            type: SET_TICKET_INFO,
            payload: {
                ticketInfo: ticketInfo,
                ticketFiles: relatedFiles,
                messages: messages,
            }
        })

        return { setTicketInfoSuccessfully: true}
    } catch (e) {
        console.log("error", e)

        return {setTicketInfoSuccessfully: false}
    }
}

export const getMessages = (ticketid) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    try{
        const messages = await get(`/helpdesk/tickets/${ticketid}/mensajes/`, {
            Authorization: `Bearer ${accessToken}`,
        })

        dispatch({
            type: SET_MESSAGES,
            payload: messages,
        })

        return { setMessagesSuccessfully: true}
    } catch (e) {
        console.log("error", e)

        return {setMessagesSuccessfully: false}
    }
}

export const createNewMessage = (texto, file, ticketId) => async (dispatch, getState) => {
    const currentMessages = selectTicketMessages(getState()).map((message) => message)

    const accessToken = localStorage.getItem("jwt")
    const isAdmin = localStorage.getItem("isAdmin")  === "true"
    const isFromClient = isAdmin === true ? "0" : "1"

    console.log("Tipo de isAdmin:", typeof isAdmin)
    
    const body = new FormData()
    body.append('texto', texto) 
    body.append('archivo', file)
    body.append('isFromClient', isFromClient)
    body.append('ticket', ticketId)

    console.log("isAdmin", isAdmin)
    console.log("isFromClient", isFromClient)

    try {
        const tempMessages = currentMessages.map((message) => message)
        tempMessages.push({
            isFromClient,
            texto,
            file
        })

        dispatch({
            type: SET_MESSAGES,
            payload: tempMessages
        })

        const sentMessage = await post("/helpdesk/mensajes/crear/", body, {
            Authorization: `Bearer ${accessToken}`,
        })

        currentMessages.push(sentMessage)

        return { messageCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { messageCreatedSuccessfully: false }
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

        const ticketId = response.id

        return { ticketCreatedSuccessfully: true, newTicketId: ticketId }
    } catch (e) {
        console.log("error", e)

        return { ticketCreatedSuccessfully: false, newTicketId: undefined }
    }
}

export const searchTicketByInfo = (searchWord) => async (dispatch, getState) => {
    const curentTickets = selectTicketsDuplication(getState())

    console.log("curentTickets",curentTickets)
    console.log("searchWord",searchWord)

    let searchDate = null;
    try {
        searchDate = new Date(searchWord);
        if (isNaN(searchDate)) {
            searchDate = null;
        }
    } catch (e) {
        console.log("Invalid date format");
    }

    const searchedTickets = curentTickets.filter((ticket) => {
        const ticketDate = new Date(ticket.created_at);
        return (
            ticket.id == searchWord ||
            ticket.asunto.toLowerCase().includes(searchWord.toLowerCase()) ||
            ticket.problema.prioridad.name.toLowerCase().includes(searchWord.toLowerCase()) ||
            ticket.user.email.toLowerCase().includes(searchWord.toLowerCase()) ||
            (searchDate && ticketDate.toDateString() === searchDate.toDateString())
        );
    });

    console.log("searchedTickets",searchedTickets)

    dispatch({
        type: SET_TICKETS_TABLE,
        payload: searchedTickets
    })

    return { setTicketsTableSuccessfully: true}
}

export const searchTicketByStatus = (status) => async (dispatch, getState) => {
    const currentTickets = selectTicketsDuplication(getState());

    console.log("currentTickets", currentTickets);
    console.log("status", status);

    // Filtra los tickets por el estado seleccionado
    const searchedTickets = currentTickets.filter((ticket) => 
        ticket.status === status
    );

    console.log("searchedTickets", searchedTickets);

    // Despacha la acción para actualizar la tabla de tickets con los tickets filtrados
    dispatch({
        type: SET_TICKETS_TABLE,
        payload: searchedTickets
    });

    return { setTicketsTableSuccessfully: true };
};

export const deleteTicket = (ticketid) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    console.log("accessToken", accessToken)
    console.log("ticketid", ticketid)
    try {
        const ticketDeleted = await put(`/helpdesk/tickets/${ticketid}/delete/`, {}, {
            Authorization: `Bearer ${accessToken}`,
        })
        console.log("ticketDeleted", ticketDeleted)

        return { ticketDeletedSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { ticketDeletedSuccessfully: false }
    }
}