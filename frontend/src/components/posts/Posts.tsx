import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import Post from "./post/Post";
import "./posts.css";

const Posts = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [newPostContent, setNewPostContent] = useState("");

  const handleNewPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPostContent(e.target.value);
  };

  const handlePostSubmit = () => {
    if (newPostContent.trim()) {
      setPosts([...posts, newPostContent]);
      setNewPostContent(""); 
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
          <h3>Ranim</h3>
        </div>

        <textarea
          className="new_post_textbox"
          placeholder="What's in your mind..?"
          value={newPostContent}
          onChange={handleNewPostChange}
        ></textarea>

        <button className="navbar_profile_button" onClick={handlePostSubmit}>
          <FaPlus />
          <span className="text">Post</span>
        </button>
      </div>

      <div className="post_list">
        {posts.map((content, index) => (
          <Post key={index} content={content} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
