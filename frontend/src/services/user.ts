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