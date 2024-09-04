import axios from "../api/axios";

const url = "/message";

export type Message = {
  _id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
};

export const sendMessage = async (content: string, receiverId: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${url}/${receiverId}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
