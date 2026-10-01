import axios from "axios";

export const api = axios.create({
    baseURL: "https://asteristico.onrender.com",
    withCredentials: true
});

api.interceptors.request.use((config) => {

    return config;
})