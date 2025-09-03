import axios from "axios";
import { cookies } from "next/headers";

const instance = axios.create({
    baseURL: "https://api-yeshtery.dev.meetusvr.com/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
instance.interceptors.request.use(
    async (config) => {
        const token = (await cookies()).get("meetusartoken")?.value;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default instance;