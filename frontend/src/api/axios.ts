import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

export default instance;