import axios from "axios";
import { StorageAdapter } from "../adapters/storage-adapter";

const API_URL = 'https://visonmodel.onrender.com';

const chatApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

chatApi.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('token');
        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);

export {
    chatApi
};


