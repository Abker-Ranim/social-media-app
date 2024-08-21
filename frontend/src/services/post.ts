import axios  from "../api/axios";

const url = '/post' ;

export type NewPost = {
    id?: string;
    content: string;
    postOwner:string;
    
}

export const createPost = async (body: NewPost) => {
    const token = localStorage.getItem("token");
  
    const response = await axios.post(`${url}/`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response;
  };
  
  export const getPosts = async (): Promise<NewPost[]> => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return response.data;  };