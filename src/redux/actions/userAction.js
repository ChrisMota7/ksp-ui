import { get, put, post } from "@/utils/api"
import { SET_FILTERED_USERS, SET_USERS, selectAdminUsers, selectClientUsers, SET_EMPRESAS } from "../reducers/userReducer"
import { filterUsersByFullName } from "@/app/constants"

import { RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from "../reducers/userReducer";

export const getEmpresas = () => async (dispatch) => {
    try {
        const response = await get("/user/empresas/");
        console.log('Response from API:', response); 
        dispatch({
            type: SET_EMPRESAS,
            payload: response,
        });
        return response;
    } catch (error) {
        console.error("Error fetching companies", error);
        return [];
    }
};

export const filterUsersByEmpresa = (empresaId) => async (dispatch) => {
    const { getUsersSuccessfully, allUsers } = await dispatch(getUsers());
    if (getUsersSuccessfully && Array.isArray(allUsers)) {
        let filteredUsers;
        if (empresaId === '') {
            filteredUsers = allUsers; // Si `empresaId` está vacío, retorna todos los usuarios
        } else if (empresaId === 'no_empresa') {
            filteredUsers = allUsers.filter(user => !user.empresa); // Filtra usuarios sin empresa
        } else {
            filteredUsers = allUsers.filter(user => user.empresa && user.empresa.id === empresaId);
        }

        dispatch({
            type: SET_FILTERED_USERS,
            payload: filteredUsers
        });
    } else {
        dispatch({
            type: SET_FILTERED_USERS,
            payload: []
        });
    }
};



export const resetPassword = (uid, token, newPassword) => async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const url = `/user/reset-password/${uid}&/${token}/`;
        const body = { password: newPassword };

        console.log("URL:", url);
        console.log("Request Body:", body);

        const response = await post(url, body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
        console.log("Response Data:", response.data);
        return { resetPasswordSuccessfully: true };
    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response && error.response.data.message
                   ? error.response.data.message
                   : error.message
        });
        console.log("Error Response:", error.response);
        return { resetPasswordSuccessfully: false, message: error.message };
    }
};


export const getUsers = (empresaId = null) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");
    try {
        let url = "/user/getAllUsers/";
        if (empresaId) {
            url += `?empresa_id=${empresaId}`;
        }
        const allUsers = await get(url, {
            Authorization: `Bearer ${accessToken}`,
        });

        const adminUsers = allUsers.filter((user) => user.isAdmin === "1");
        const clientUsers = allUsers.filter((user) => user.isAdmin === "0");

        dispatch({
            type: SET_USERS,
            payload: {
                adminUsers: adminUsers,
                clientUsers: clientUsers,
            }
        });

        return { getUsersSuccessfully: true, allUsers };
    } catch (e) {
        console.log("error", e);
        return { getUsersSuccessfully: false, allUsers: [] };
    }
};

export const updateUserDetails = (userId, newEmail, newPassword, empresa, newPhoneNumber) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    try {
        const payload = { email: newEmail, empresa_id: empresa, telefono: newPhoneNumber };
        if (newPassword) {
            payload.password = newPassword;
        }

        const response = await put(`/user/${userId}/UpdateUser/`, payload, {
            Authorization: `Bearer ${accessToken}`
        });

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

export const filterUsersByName = (userName) => async (dispatch, getState) => {
    const clientUsers = selectClientUsers(getState()).map((message) => message)
    const adminUsers = selectAdminUsers(getState()).map((message) => message)

    const filteredClientUsers = filterUsersByFullName(clientUsers, userName)
    const filteredAdminUsers = filterUsersByFullName(adminUsers, userName)

    const filteredUsers = [...filteredClientUsers, ...filteredAdminUsers]

    dispatch({
        type: SET_FILTERED_USERS,
        payload: filteredUsers
    })
}

export const removeUsersFilter = () => async (dispatch) => {
    dispatch({
        type: SET_FILTERED_USERS,
    })
}

export const sendPasswordResetEmail = (email) => async (dispatch) => {
    const accessToken = localStorage.getItem("jwt");

    try {
        const response = await post(`/user/send-reset-email/`, {
            Authorization: `Bearer ${accessToken}`,
            email: email
        });

        console.log("response", response);
        
        return { sendPasswordResetEmailSuccessfully: true };
        
    } catch (e) {
        console.error("error", e);
        return { sendPasswordResetEmailSuccessfully: false };
    }
}
