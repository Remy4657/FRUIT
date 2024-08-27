import * as actionTypes from "../actions/type";
import Cookies from 'js-cookie';

const INITIAL_STATE = {
    auth: false,
    token: "",
    account: {
        email: "",
        username: ""

    },
    isLoading: false,
    access_token: ""
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN:
            console.log("reducer login")
            return {
                ...state,
                auth: true,
                account: {
                    email: action.user.email,
                    username: action.user.username
                },
                isLoading: false

            };
        case actionTypes.LOGOUT:
            // console.log("logout: ", document.cookie)
            // Cookies.remove('access_token')
            //Cookies.set('jtt', 'value')
            // var delete_cookie = function () {
            //     document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            // };
            // delete_cookie();

            // document.cookie = "access_token=John Smith; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";
            return {
                ...state,
                auth: false,
                token: "",
                account: {
                    email: "",
                    username: ""

                },
                access_token: ""
            };
        // update state => initial state



        default: {
            return state // We return the default state here
        }
    }
};

export default userReducer;
