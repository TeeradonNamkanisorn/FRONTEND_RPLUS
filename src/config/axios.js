import axios from "axios";
import { getAccessToken } from "../services/localStorage";
import { BACKEND_URL } from './env';
axios.defaults.baseURL = BACKEND_URL;

axios.interceptors.request.use(config => {
    const token = getAccessToken();
    if (token) {
        config.headers.authorization = "Bearer "+ token;
    }
    return config;
}, err => Promise.reject(err))
export default axios;