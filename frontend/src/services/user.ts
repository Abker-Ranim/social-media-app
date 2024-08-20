import axios  from "../api/axios";

const url = '/user' ;

interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const signup = async (body: User): Promise<any> => {
    return await axios.post(`${url}/signup`, body);
};

interface LoginData {
    email: string;
    password: string;
}

export const login = async (body: LoginData): Promise<any> => {
    const response = await axios.post(`${url}/login`, body);
    if (response.status === 200)
        localStorage.setItem("token", response.data.token); 
    return response;
};

export const logout = () => {
    localStorage.removeItem("token");
}

export const getToken = () => {
    return localStorage.getItem("token");
};

