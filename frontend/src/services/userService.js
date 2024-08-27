import axios from '../setup/axios'

const registerNewUser = async (userRegisterInfo) => {
    return axios.post("/api/v1/register", {
        email: userRegisterInfo.email,
        phone: userRegisterInfo.phone,
        username: userRegisterInfo.username,
        password: userRegisterInfo.password,
    });
};
const loginUser = async (userLoginInfo) => {
    return axios.post("/api/v1/login", {
        email: userLoginInfo.email,
        password: userLoginInfo.password
    })
}
const refresh = async () => {
    return axios.get("/api/v1/refresh")
}
const logout = async () => {
    return axios.get("/api/v1/logout")
}
const refreshAccessToken = async () => {
    return axios.get("/api/v1/refresh_access_token")
}
const setNewAccessToken = async (newAccessToken) => {
    return axios.post("/api/v1/set_new_access_token", { newAccessToken: newAccessToken })
}

export { registerNewUser, loginUser, refresh, logout, refreshAccessToken, setNewAccessToken } 
