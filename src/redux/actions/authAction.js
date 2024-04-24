import { get, post } from "@/utils/api"
import { jwtDecode } from "jwt-decode";

export const login = (email, password) => async (dispatch) => {
    try {
        console.log("here")
        const { access } = await post("/api/token/", {
            email,
            password
        })
        
        const { user_id } = jwtDecode(access)

        const { is_admin } = await get("/auth/user-type/", {
            Authorization: `Bearer ${access}`,
        })
        
        localStorage.setItem("jwt", access)
        localStorage.setItem("userid", user_id)
        localStorage.setItem("user_email", email)
        localStorage.setItem("isAdmin", is_admin)

        console.log("access",access)
        console.log("user_id",user_id)
        console.log("isAdmin",is_admin)

        return { userAuthenticationSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { userAuthenticationSuccessfully: false }
    } 
}