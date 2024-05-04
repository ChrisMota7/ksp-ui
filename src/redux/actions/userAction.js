import { get } from "@/utils/api"
import { SET_USERS } from "../reducers/userReducer"

export const getUsers = () => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt")

    try {
        const allUsers = await get("/users/", {
            Authorization: `Bearer ${accessToken}`,
        })

        const adminUsers = allUsers.filter((user) => user.isAdmin === "1")
        const normalUsers = allUsers.filter((user) => user.isAdmin === "0")

        dispatch({
            type: SET_USERS,
            payload: {
                adminUsers: adminUsers,
                normalUsers: normalUsers,
            }
        })

        return { getUsersSuccessfully: true }
    } catch (e) {
        console.log("error", e)

        return { getUsersSuccessfully: false }
    } 
}