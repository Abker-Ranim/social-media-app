import axios from "../api/axios";
import { Message } from "./message";

const url = "/conversation";

export const getConversations = async (): Promise<any[]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getConversation = async (
  conversationId: string
): Promise<[Message]> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${url}/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
