import * as typeAction from "./type"

export const USER_LOGIN = (user) => {
    return {
        type: typeAction.USER_LOGIN,
        user: user
        //user_login: user
    };
};
export const LOGOUT = () => {
    return {
        type: typeAction.LOGOUT,
    };
};