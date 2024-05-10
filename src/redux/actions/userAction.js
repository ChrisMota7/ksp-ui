import { get } from "@/utils/api"
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

export const updatePasswordUser = (userid, newPassword) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    console.log("accessToken", accessToken)
    console.log("userid", userid)
    console.log("newStatus", newStatus)
    try {
        const userPasswordUpdated = await put(`user/${userid}/UpdateUser/`, {
            password: newPassword
        }, {
            Authorization: `Bearer ${accessToken}`,
        })
        console.log("userPasswordUpdated", userPasswordUpdated)

        return { setupdatePasswordUserSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { setupdatePasswordUserSuccessfully: false }
    }
}