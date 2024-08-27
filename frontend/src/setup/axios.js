import axios from 'axios'
import { toast } from 'react-toastify'
import { refreshAccessToken } from '../services/userService';
import { setNewAccessToken } from '../services/userService';

const instance = axios.create({
    baseURL: 'http://localhost:8080',

});

instance.defaults.withCredentials = true; // use to set value of cookie


// set header authorization

//instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("jwt")}`;

instance.interceptors.request.use(function (config) {

    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
let countRun = 0
// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
}, async function (error) {

    if (error.config && error.response && +error.response.status === 401 && countRun === 0) {
        countRun = countRun + 1
        const access_token = await refreshAccessToken()
        if (access_token && access_token.EC === 1) {
            await setNewAccessToken(access_token.DT)
            //localStorage.setItem("access_token", access_token.DT)
            return instance.request(error.config)
        }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    const status = error.response.status || 500;
    //const status = 500
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            // console.log(error.response)
            //toast.error(error.response.data.EM)
            return error.response.data;
        }

        // forbidden (permission related issues)
        case 403: {

            toast.error("You don't permission")
            return Promise.reject(error);
        }

        // bad request
        case 400: {
            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return error?.response?.data ?? Promise.reject(error);
        }
    }
});
export default instance