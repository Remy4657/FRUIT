import userService from "../services/userService"


const registerController = async (req, res) => {
    try {
        let data = await userService.createNewUser({ ...req.body });
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}

const getAllUser = async (req, res) => {
    try {

        let data = await userService.getAllUser()
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: "",
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
            DT: "",
        });
    }
}
const loginController = async (req, res) => {
    try {

        let data = await userService.loginService(req.body)
        if (data && data.EC === 1) {

            res.cookie('access_token', data.DT.access_token, { httpOnly: true })
            res.cookie('refresh_token', data.DT.refresh_token, { httpOnly: true })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
const refreshController = async (req, res) => {
    try {
        //console.log("res refresh: ", res)
        if (req.user) {
            return res.status(200).json({
                EM: "Refresh page ok",
                EC: 1,
                DT: req.user,
            });
        }
        else {
            return res.status(200).json({
                EM: "Refresh page not ok",
                EC: 2,
                DT: "",
            });
        }

    } catch (error) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
const logout = (req, res) => {
    try {
        res.cookie('access_token', 'a', { expires: new Date(0) });
        res.cookie('refresh_token', 'b', { expires: new Date(0) });
        // res.clearCookie('access_token', { path: '/' });
        // res.clearCookie('refresh_token', { path: '/' });
        return res.status(200).json({
            EM: "logout success",
            EC: 1,
            DT: "",
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
const refreshToken = async (req, res) => {
    try {

        const varRefreshToken = req.cookies.refresh_token
        const data = await userService.refreshToken(varRefreshToken)

        if (data && +data.EC === 1) {

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
        if (data && +data.EC === 0) {                                   // khong co refresh token hoac refresh_token het han
            return res.status(401).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
            });
        }
        return res.status(500).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }

}
const setNewAccessToken = (req, res) => {
    try {
        //console.log("new access token: ", req.body.newAccessToken)
        res.cookie('access_token', req.body.newAccessToken, { httpOnly: true }) // ghi de acces_token
        // res.cookie('refresh_token', 'b', { expires: new Date(0) });
        return res.status(200).json({
            EM: "set New AccessToken success",
            EC: 1,
            DT: "",
        });
    }
    catch (e) {
        return res.status(500).json({
            EM: e,
            EC: "-1",
            DT: "",
        });
    }
}
module.exports = {
    registerController,
    getAllUser,
    loginController,
    refreshController,
    logout,
    refreshToken,
    setNewAccessToken
}
