import { get, put } from "@/utils/api"
import { SET_USERS } from "../reducers/userReducer"

export const getUsers = () => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    try {
        const allUsers = await get("/user/getAllUsers/", {
            Authorization: `Bearer ${accessToken}`,
        })

        console.log("allUsers", allUsers)
        const adminUsers = allUsers.filter((user) => user.isAdmin === "1")
        console.log("allUsers", allUsers)
        const clientUsers = allUsers.filter((user) => user.isAdmin === "0")

        dispatch({
            type: SET_USERS,
            payload: {
                adminUsers: adminUsers,
                clientUsers: clientUsers,
            }
        })

        return { getUsersSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { getUsersSuccessfully: false }
    } 
}

export const updatePasswordUser = (userId, newPassword) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    console.log("accessToken", accessToken);
    console.log("userId", userId);
    console.log("newPassword", newPassword);

    try {           
        const response = await put(`/user/${userId}/UpdateUser/`, {
            Authorization: `Bearer ${accessToken}`,
            password: newPassword
        });

        console.log("response", response);
        
        return { setUpdatePasswordUserSuccessfully: true };
        
    } catch (e) {

        return { setUpdatePasswordUserSuccessfully: false };
    }
}

export const updateUserDetails = (userId, newEmail, newPassword) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    console.log("accessToken", accessToken);
    console.log("userId", userId);
    console.log("newEmail", newEmail);
    console.log("newPassword", newPassword);

    try {
        const response = await put(`/user/${userId}/UpdateUser/`, {
            Authorization: `Bearer ${accessToken}`,
            email: newEmail,
            password: newPassword
        });

        console.log("response", response);
        
        return { setUpdateUserSuccess: true };
        
    } catch (e) {
        return { setUpdateUserSuccess: false };
    }
}

export const deleteUser = (userId) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    console.log("accessToken", accessToken);
    console.log("userId", userId);

    try {
        const response = await put(`/user/${userId}/delete/`, {
            Authorization: `Bearer ${accessToken}`,
            userId: userId
        });

        console.log("response", response);
        
        return { setUserDeletedSuccessfully: true };
    } catch (e) {
        console.log("e",e)

        return { setUserDeletedSuccessfully: false };
    }
}