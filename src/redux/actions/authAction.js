import { get, post } from "@/utils/api"
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATE_USER, LOGOUT_USER } from "../reducers/authReducer";

export const login = (email, password) => async (dispatch) => {
    try {
        console.log("here")
        const { access } = await post("/api/token/", {
            email,
            password,
        })

        const { user_id } = jwtDecode(access)

        const { is_admin } = await get("/user/user-type/", {
            Authorization: `Bearer ${access}`,
        });
        
        localStorage.setItem("jwt", access);
        localStorage.setItem("userid", user_id);
        localStorage.setItem("user_email", email);
        localStorage.setItem("isAdmin", is_admin);

        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
                jwt: access,
                userid: user_id,
                isAdmin: is_admin,
            }
        });

        setTimeout(() => {
            window.location.reload();
        }, 500);
        
        return { userAuthenticationSuccessfully: true, message: undefined }
    } catch (e) {
        console.log("error", e);

        const messageString = e.request.response;
        const messageJson = JSON.parse(messageString);
        const message = messageJson.message[0];

        return { userAuthenticationSuccessfully: false, message }
    } 
}

export const logout = () => async (dispatch) => {
    try {        
        localStorage.removeItem("jwt");
        localStorage.removeItem("userid");
        localStorage.removeItem("user_email");
        localStorage.removeItem("isAdmin");

        dispatch({
            type: LOGOUT_USER
        });

        return { userLoggedOutSuccessfully: true }
    } catch (e) {
        console.log("error", e);

        return { userLoggedOutSuccessfully: false }
    } 
}

export const setAuthInfo = () => async (dispatch) => {
    try {        
        const jwt = localStorage.getItem("jwt");
        const userid = localStorage.getItem("userid");
        const isAdmin = localStorage.getItem("isAdmin");

        dispatch({
            type: AUTHENTICATE_USER,
            payload: {
                jwt: jwt,
                userid: userid,
                isAdmin: isAdmin,
            }
        });

        return { userAuthenticationSuccessfully: true }
    } catch (e) {
        console.log("error", e);

        return { userAuthenticationSuccessfully: false }
    } 
}

export const createUser = (firstName, lastName, email, password, isAdmin) => async (dispatch) => {
    try {
      await post("/user/create/", {
        firstName,
        lastName,
        email,
        password,
        isAdmin: isAdmin ? "1" : "0"
        });
  
      return { userCreatedSuccessfully: true }
    } catch (e) {
        console.log("error", e);
  
      return { userCreatedSuccessfully: false }
    }
  }
