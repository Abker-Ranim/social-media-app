import axios, { AxiosInstance } from "axios";

export const baseURL = import.meta.env.VITE_SERVER_URL;

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default instance;
