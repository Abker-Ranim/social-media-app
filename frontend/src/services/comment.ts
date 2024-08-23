import axios from "../api/axios";
import { User } from "./user";

const url = "/comment";

export type Comment = {
    _id?: string;
    content: string;
    commentOwner: User;
    post: string;
    createdAt: string;
};

export const createComment = async (body: {content: string, post: string}) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${url}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};

export const getCommentsByPostId = async (id: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${url}/commentsByPost/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
