import axios from "../api/axios";

const url = "/converstion";

export type Conversation = {
    _id: string;
    recipients:[]
};


export const getConversation =async (): Promise<[Conversation]>=> {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${url}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
