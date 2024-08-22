import axios from "../api/axios";

const url = "/post";

export type Post = {
  _id: string;
  content: string;
  postOwner: string;
  createdAt: string;
};

export const createPost = async (body: any) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${url}/`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export const getPosts = async (): Promise<Post[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
