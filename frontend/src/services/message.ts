import axios from "../api/axios";

const url = "/message";

export type Message = {
  _id: string;
  content: string;
  sender: string;
  receiver: string;
  createdAt: string;
};

export const sendMessage = async (content: string, receiverIds: string[]) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${url}`,
    { content, receiverIds },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
