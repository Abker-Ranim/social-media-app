import axios from "../api/axios";
import { User } from "./user";

const url = "/post";

export type Post = {
  _id: string;
  content: string;
  postOwner: User;
  imageUrl:string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  liked?: boolean;
};

export const createPost = async (body: any) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${url}/`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
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

export const getPostsByUser = async (userId: string): Promise<Post[]> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${url}/byUser/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updatePost = async (id: string, content: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${url}/${id}`,
    { content },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
export const deletePost = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
