import axios, { AxiosInstance } from "axios";

export const baseURL = "http://localhost:5000";

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default instance;
