import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:8080",
    withCredentials: true
});

api.interceptors.request.use((config) => {

    return config;
})