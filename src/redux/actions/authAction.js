import { get, post } from "@/utils/api"
import { SET_PROBLEMS } from "../reducers/ticketReducer"

import { jwtDecode } from "jwt-decode";
import { AUTHENTICATE_USER } from "../reducers/authReducer";

export const login = (email, password) => async (dispatch) => {
    try {
        console.log("here")
        const { access } = await post("/api/token/", {
            email,
            password
        })
        
        localStorage.setItem("jwt", access)

        const { user_id } = jwtDecode(access)
        
        localStorage.setItem("userid", user_id)
        localStorage.setItem("user_email", email)

        console.log("access",access)
        console.log("user_id",user_id)

        return { userAuthenticationSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { userAuthenticationSuccessfully: false }
    } 
}