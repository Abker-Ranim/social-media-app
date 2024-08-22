import axios from "../api/axios";

const url = "/like";

export type Like = {
  _id?: string;
  post: string;
  user?: string;
};
export const createLike = async (body: Like) => {
    const token = localStorage.getItem("token");
  
    const response = await axios.post(`${url}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response;
  };
  export const deleteLike = async (postId: string) => {
    const token = localStorage.getItem("token");
  
    const response = await axios.delete(`${url}/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response;
  };
  