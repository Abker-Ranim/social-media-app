import axios from "../api/axios";

const url = "/user";

export type User = {
  includes(_id: string | undefined): import("react").SetStateAction<boolean>;
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  profilePicture: string;
  coverPicture: string;
  followers :User;
  following:User;
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
  const res = await axios.get(`${url}/details/${id}`);
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

export const updateUserImage = async (
  formData: FormData,
  type: "profile" | "cover"
): Promise<User> => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${url}/uploadImage/${type}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const refreshUser = async (): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${url}/refresh`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.setItem("token", response.data.token);
  return response.data;
};
export const followUser = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${url}/follow/${id}`,{}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const unfollowUser = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${url}/unfollow/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};