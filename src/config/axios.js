import axios from "axios";
import { BACKEND_URL } from './env';
axios.defaults.baseURL = BACKEND_URL;

export default axios;