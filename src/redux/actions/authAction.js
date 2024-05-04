import { get, post } from "@/utils/api"
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATE_USER } from "../reducers/authReducer";

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

        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
                jwt: access,
                userid: user_id,
                isAdmin: is_admin,
            }
        })

        console.log("access",access)
        console.log("user_id",user_id)
        console.log("isAdmin",is_admin)

        return { userAuthenticationSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { userAuthenticationSuccessfully: false }
    } 
}

export const setAuthInfo = () => async (dispatch) => {
    try {        
        const jwt = localStorage.getItem("jwt")
        const userid = localStorage.getItem("userid")
        const isAdmin = localStorage.getItem("isAdmin")

        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
                jwt: jwt,
                userid: userid,
                isAdmin: isAdmin,
            }
        })

        console.log("userid",userid)
        console.log("isAdmin",isAdmin)

        return { userAuthenticationSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { userAuthenticationSuccessfully: false }
    } 
}

export const createUser = (firstName, lastName, email, password, isAdmin) => async (dispatch) => {
  
    const body = new FormData()
    body.append('firstName', firstName)
    body.append('lastName', lastName)
    body.append('email', email)
    body.append('password', password)
    body.append('isAdmin', isAdmin)
  
    try{
      const response = await post("/users/create",  body)
  
      console.log("response", response)
  
      return { CreateUserSuccessfully: true }
    } catch (e) {
      console.log("error", e)
  
      return { CreateUserSuccessfully: false }
    }
  }