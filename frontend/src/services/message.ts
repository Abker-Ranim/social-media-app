import axios from "../api/axios";
import { Conversation } from "./conversation";
import { User } from "./user";

const url = "/message";

export type Message = {
    _id: string;
    content: string;
    sender: User;
    receiver: User;
    createdAt: string;
    conversation: Conversation;
};

export const createMessage = async (body: { content: string }) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${url}`, body, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
export const getMessage =async (): Promise<[Message]>=> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
