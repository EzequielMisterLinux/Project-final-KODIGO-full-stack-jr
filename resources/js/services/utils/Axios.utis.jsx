import axios from "axios";

export const AxiosRouter = axios.create({
    baseURL: import.meta.MIX_API_URL, 
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "withCredentials": true,
    },
});
