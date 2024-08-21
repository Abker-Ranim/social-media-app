import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { createPost, getPosts, NewPost } from "../../services/post";
import "./posts.css";
import Post from "./post/Post";

const Posts = () => {
  const [posts, setPosts] = useState<NewPost[]>([]);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        console.log(fetchedPosts)
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async () => {
    if (newPostContent.trim()) {
      const newPost: NewPost = {
        content: newPostContent,
      };

      try {
        const response = await createPost(newPost);
        setPosts(prevPosts => [...prevPosts, response.data.createdPost]);
        setNewPostContent("");
      } catch (error) {
        console.error("Failed to create post:", error);
      }
    } else {
      console.warn("Post content is empty");
    }
  };

  return (
    <div className="posts">
      <div className="new_post">
        <div className="user_details">
          <img
            src="https://images.pexels.com/photos/27525165/pexels-photo-27525165/free-photo-of-lumineux-leger-paysage-gens.jpeg"
            alt=""
          />
          <h3>{"Ranim"}</h3>
        </div>

        <textarea
          className="new_post_textbox"
          placeholder="What's in your mind..?"
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
        ></textarea>

        <button className="navbar_profile_button" onClick={handlePostSubmit}>
          <FaPlus />
          <span className="text">Post</span>
        </button>
      </div>

      <div className="post_list">
        {posts.map((post, index) => (
          <Post key={index} content={post.content} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
