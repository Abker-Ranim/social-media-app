import axios  from "../api/axios";

const url = '/user' ;

export type User = {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

interface LoginData {
    email: string;
    password: string;
}

export const signup = async (body: User): Promise<any> => {
    return await axios.post(`${url}/signup`, body);
};

export const login = async (body: LoginData): Promise<any> => {
    const response = await axios.post(`${url}/login`, body);
    if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
    }
    return response;
};

export const getCurrentUser = async (): Promise<User> => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${url}/current`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const isLoggedIn = (): boolean => {
    return !!(localStorage.getItem("token"));
};

export const logout = () => {
    localStorage.removeItem("token");
}

export const getToken = () => {
    return localStorage.getItem("token");
};

