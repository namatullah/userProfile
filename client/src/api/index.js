import axios from 'axios';
import {SERVER_PORT} from "../constants/api";
const API = axios.create({ baseURL: SERVER_PORT });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});
export default API;
