import axios from "axios";

export const api = axios.create({
    baseURL: "https://glorious-carnival-jj9g96pv567vf55rp-8080.app.github.dev",
    withCredentials: true
});

api.interceptors.request.use((config) => {

    return config;
})