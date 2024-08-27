import express from "express";
const router = express.Router();
import userController from "../controller/userController";
import jwtAction from "../jwt/jwtAction"

const initApiRoutes = (app) => {
    router.all("*", jwtAction.checkUserJWT);

    router.post("/register", userController.registerController)
    router.post("/login", userController.loginController)
    router.get("/logout", userController.logout)
    router.get("/refresh", userController.refreshController)
    router.get("/get-all-user", userController.getAllUser)
    router.get("/refresh_access_token", userController.refreshToken)
    router.post("/set_new_access_token", userController.setNewAccessToken)
    return app.use("/api/v1", router)
}
export default initApiRoutes