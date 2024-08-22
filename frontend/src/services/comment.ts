import axios from "../api/axios";

const url = "/comment";

export type Comment = {
    _id?: string;
    content: string;
    commentOwner?: string;
    post: string;

};
export const createComment = async (body: Comment) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${url}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};
export const getCommentsByPostId = async (_id: string) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${url}/commentsByPost/${_id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
