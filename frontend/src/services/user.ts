import axios from "../api/axios";

const url = "/user";

export type User = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  image: string;
};

interface LoginData {
  email: string;
  password: string;
}

export const signup = async (body: User): Promise<any> => {
  return await axios.post(`${url}/signup`, body);
};

export const getUsers = async (): Promise<any[]> => {
  const res = await axios.get(url);
  return res.data;
};

export const getUserDetails = async (id: string): Promise<User> => {
  const res = await axios.get(`${url}/${id}`);
  return res.data;
};

export const searchUsers = async (keyword: string): Promise<User> => {
  const res = await axios.get(`${url}/search/${keyword}`);
  return res.data;
};

export const login = async (body: LoginData): Promise<any> => {
  const response = await axios.post(`${url}/login`, body);
  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
  }
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${url}/current`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const updateUserImage = async (formData: FormData): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${url}/uploadImage`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
