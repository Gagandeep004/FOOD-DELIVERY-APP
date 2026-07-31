import axios from "axios";

const envBaseUrl = import.meta.env.VITE_API_URL;
const baseURL = envBaseUrl && !envBaseUrl.includes("localhost") && !envBaseUrl.includes("127.0.0.1")
  ? envBaseUrl
  : "/api";

const API = axios.create({
  baseURL,
});

API.interceptors.request.use((req) => {

    const token = localStorage.getItem("token");

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;